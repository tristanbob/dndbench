import React, { useEffect, useRef, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { createCanvasBlocks } from '@/utils/dndHelpers';
import CanvasSurface from '../shared/CanvasSurface';
import DragItemCard from '../shared/DragItemCard';

function Block({ block, onMove, restrictToContainer, axisLock }) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    return draggable({
      element: ref.current,
      getInitialData: () => ({ blockId: block.id }),
      onDragStart: () => setIsDragging(true),
      onDrop: ({ location }) => {
        setIsDragging(false);
        const start = location?.initial?.input;
        const end = location?.current?.input;
        if (!start || !end) return;
        onMove(block.id, end.clientX - start.clientX, end.clientY - start.clientY);
      }
    });
  }, [block.id, onMove]);

  return (
    <div ref={ref} className="absolute cursor-grab active:cursor-grabbing" style={{ left: block.x, top: block.y }}>
      <DragItemCard title={block.title} isDragging={isDragging} className="px-5 py-4 shadow-xl" disableHover />
    </div>
  );
}

export default function PragmaticCanvas({ testSettings = {} }) {
  const [blocks, setBlocks] = useState(createCanvasBlocks(testSettings.blockCount || 3));
  useEffect(() => setBlocks(createCanvasBlocks(testSettings.blockCount || 3)), [testSettings.blockCount]);

  const axisLock = testSettings.axisLock || 'none';
  const onMove = (id, dx, dy) => setBlocks((current) => current.map((block) => {
    if (block.id !== id) return block;
    const nextX = axisLock === 'y' ? block.x : block.x + dx;
    const nextY = axisLock === 'x' ? block.y : block.y + dy;
    return { ...block, x: testSettings.restrictToContainer ? Math.max(0, Math.min(260, nextX)) : nextX, y: testSettings.restrictToContainer ? Math.max(0, Math.min(300, nextY)) : nextY };
  }));

  return <CanvasSurface>{blocks.map((block) => <Block key={block.id} block={block} onMove={onMove} axisLock={axisLock} restrictToContainer={!!testSettings.restrictToContainer} />)}</CanvasSurface>;
}