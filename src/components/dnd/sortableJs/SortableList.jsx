import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { createTaskItems, createTileItems, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import DragItemCard from '../shared/DragItemCard';
import DropZone from '../shared/DropZone';

// SortableJS mutates the DOM directly, so after each drag we read the new order from
// the event indices and push it back into React state (keeping React as source of truth).
export default function SortableList({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);
  // Remount the list after every drop so React rebuilds the DOM fresh from state
  // instead of diffing against the nodes SortableJS moved.
  const [version, setVersion] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    setItems(isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4));
  }, [isGrid, testSettings.itemCount]);

  useEffect(() => {
    const sortable = Sortable.create(ref.current, {
      animation: 180,
      // Empty landing slot: hide the placeholder's content so only blank space shows.
      ghostClass: 'sortable-ghost-empty',
      // forceFallback makes SortableJS render its own clone (instead of the browser's
      // semi-transparent native drag image), so we can style it to full opacity.
      forceFallback: true,
      fallbackClass: 'sortable-fallback-solid',
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;
        if (oldIndex === newIndex) return;
        setItems((current) => reorder(current, oldIndex, newIndex));
        setVersion((v) => v + 1);
      }
    });
    return () => sortable.destroy();
  }, [version]);

  return (
    <DropZone key={version} dropRef={ref} variant={isGrid ? 'grid' : 'list'}>
      {items.map((item) => (
        <div key={item.id} className="cursor-grab active:cursor-grabbing">
          <DragItemCard title={item.title} meta={item.meta} isDragging={false} />
        </div>
      ))}
    </DropZone>
  );
}