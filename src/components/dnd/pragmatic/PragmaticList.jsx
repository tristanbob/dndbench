import React, { useEffect, useRef, useState } from 'react';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { createTaskItems, createTileItems, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import DropZone from '../shared/DropZone';
import DragItemCard from '../shared/DragItemCard';

function PragmaticItem({ item, onDrop }) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    return combine(
      draggable({ element: ref.current, getInitialData: () => ({ itemId: item.id }), onDragStart: () => setIsDragging(true), onDrop: () => setIsDragging(false) }),
      dropTargetForElements({ element: ref.current, getData: () => ({ itemId: item.id }), onDrop: ({ source }) => onDrop(source.data.itemId, item.id) })
    );
  }, [item.id, onDrop]);

  return <DragItemCard rootRef={ref} title={item.title} meta="Drop on another item" isDragging={isDragging} />;
}

export default function PragmaticList({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);

  useEffect(() => {
    setItems(isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4));
  }, [isGrid, testSettings.itemCount]);

  const moveItem = (fromId, toId) => setItems((current) => {
    const from = current.findIndex((item) => item.id === fromId);
    const to = current.findIndex((item) => item.id === toId);
    if (from < 0 || to < 0 || from === to) return current;
    return reorder(current, from, to);
  });

  return (
    <DropZone variant={isGrid ? 'grid' : 'list'}>
      {items.map((item) => <PragmaticItem key={item.id} item={item} onDrop={moveItem} />)}
    </DropZone>
  );
}