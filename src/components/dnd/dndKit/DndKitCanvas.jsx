import React, { useEffect, useRef, useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { createCanvasBlocks } from '@/utils/dndHelpers';
import CanvasSurface from '../shared/CanvasSurface';
import DraggableCard from '../DraggableCard';
import useDndSensors from './useDndSensors';

const noop = () => {};

function CanvasBlock({ id, title, position }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = { left: position.x, top: position.y, transform: CSS.Transform.toString(transform) };
  return (
    <DraggableCard
      title={title}
      isDragging={false}
      refProp={setNodeRef}
      attributes={{ ...attributes, 'data-canvas-block': id }}
      listeners={listeners}
      style={style}
      className="absolute bg-card px-5 py-4 shadow-xl"
      disableHover
    />
  );
}

export default function DndKitCanvas({ testSettings = {} }) {
  const [blocks, setBlocks] = useState(createCanvasBlocks(3));
  const [positions, setPositions] = useState(Object.fromEntries(blocks.map((block) => [block.id, { x: block.x, y: block.y }])));
  const canvasRef = useRef(null);
  const sensors = useDndSensors();

  useEffect(() => {
    const nextBlocks = createCanvasBlocks(testSettings.blockCount || 3);
    setBlocks(nextBlocks);
    setPositions(Object.fromEntries(nextBlocks.map((block) => [block.id, { x: block.x, y: block.y }])));
  }, [testSettings.blockCount]);

  const axisLock = testSettings.axisLock || 'none';
  const restrict = !!testSettings.restrictToContainer;

  // Live modifiers: constrain the drag transform AS it happens, so the block
  // visibly cannot cross the axis / leave the container during the drag.
  const axisModifier = ({ transform }) => ({
    ...transform,
    x: axisLock === 'y' ? 0 : transform.x,
    y: axisLock === 'x' ? 0 : transform.y
  });

  const restrictModifier = ({ transform, active }) => {
    if (!restrict || !canvasRef.current || !active) return transform;
    const surface = canvasRef.current.getBoundingClientRect();
    const start = positions[active.id] || { x: 0, y: 0 };
    const node = document.querySelector(`[data-canvas-block="${active.id}"]`);
    const size = node ? node.getBoundingClientRect() : { width: 0, height: 0 };
    const minX = -start.x;
    const maxX = surface.width - size.width - start.x;
    const minY = -start.y;
    const maxY = surface.height - size.height - start.y;
    return {
      ...transform,
      x: Math.max(minX, Math.min(transform.x, maxX)),
      y: Math.max(minY, Math.min(transform.y, maxY))
    };
  };

  const handleEnd = ({ active, delta }) => {
    setPositions((current) => {
      const currentPosition = current[active.id];
      let nextX = currentPosition.x + (axisLock === 'y' ? 0 : delta.x);
      let nextY = currentPosition.y + (axisLock === 'x' ? 0 : delta.y);
      if (restrict && canvasRef.current) {
        const surface = canvasRef.current.getBoundingClientRect();
        const node = document.querySelector(`[data-canvas-block="${active.id}"]`);
        const size = node ? node.getBoundingClientRect() : { width: 0, height: 0 };
        nextX = Math.max(0, Math.min(nextX, surface.width - size.width));
        nextY = Math.max(0, Math.min(nextY, surface.height - size.height));
      }
      return { ...current, [active.id]: { x: nextX, y: nextY } };
    });
  };

  return (
    <DndContext sensors={sensors} modifiers={[axisModifier, restrictModifier]} onDragStart={noop} onDragOver={noop} onDragEnd={handleEnd} onDragCancel={noop}>
      <CanvasSurface surfaceRef={canvasRef}>
        {blocks.map((block) => <CanvasBlock key={block.id} id={block.id} title={block.title} position={positions[block.id]} />)}
      </CanvasSurface>
    </DndContext>
  );
}