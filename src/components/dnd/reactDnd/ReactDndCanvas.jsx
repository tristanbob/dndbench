import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { createCanvasBlocks } from '@/utils/dndHelpers';
import CanvasSurface from '../shared/CanvasSurface';
import DragItemCard from '../shared/DragItemCard';
import { CARD } from './itemTypes';

function CanvasBlock({ block }) {
  const blockRef = useRef(null);
  const [{ isDragging }, drag, preview] = useDrag({ type: CARD, item: () => {
    const rect = blockRef.current?.getBoundingClientRect();
    return { id: block.id, preview: { title: block.title, width: rect?.width || 180, sourceX: rect?.left || 0, sourceY: rect?.top || 0 } };
  }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const connectBlock = (node) => {
    blockRef.current = node;
    drag(node);
  };

  return <DragItemCard title={block.title} isDragging={isDragging} rootRef={connectBlock} style={{ left: block.x, top: block.y }} className="absolute bg-card px-5 py-4 shadow-xl" draggingClassName="opacity-30" disableHover />;
}

export default function ReactDndCanvas({ testSettings = {} }) {
  const [blocks, setBlocks] = useState(createCanvasBlocks(testSettings.blockCount || 3));

  useEffect(() => {
    setBlocks(createCanvasBlocks(testSettings.blockCount || 3));
  }, [testSettings.blockCount]);

  const [, drop] = useDrop({ accept: CARD, drop: (item, monitor) => { const delta = monitor.getDifferenceFromInitialOffset(); if (!delta) return; setBlocks((current) => current.map((block) => block.id === item.id ? { ...block, x: block.x + delta.x, y: block.y + delta.y } : block)); } });

  return <CanvasSurface surfaceRef={drop}>{blocks.map((block) => <CanvasBlock key={block.id} block={block} />)}</CanvasSurface>;
}