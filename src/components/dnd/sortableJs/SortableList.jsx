import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { createTaskItems, createTileItems, initialTasks, initialTiles } from '@/utils/dndHelpers';
import DragItemCard from '../shared/DragItemCard';

// Official React binding: ReactSortable owns the DOM<->state sync, so we just
// hand it the list and setList and let it keep React as the source of truth.
export default function SortableList({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);

  useEffect(() => {
    setItems(isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4));
  }, [isGrid, testSettings.itemCount]);

  const variantClass = isGrid ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-3';

  return (
    <ReactSortable
      list={items}
      setList={setItems}
      animation={180}
      ghostClass="sortable-ghost-empty"
      forceFallback
      fallbackClass="sortable-fallback-solid"
      className={`${variantClass} rounded-3xl border bg-background/70 p-4`}
    >
      {items.map((item) => (
        <div key={item.id} className="cursor-grab active:cursor-grabbing">
          <DragItemCard title={item.title} meta={item.meta} isDragging={false} />
        </div>
      ))}
    </ReactSortable>
  );
}