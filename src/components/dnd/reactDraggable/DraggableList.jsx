import React, { useEffect, useState } from 'react';
import { createTaskItems, createTileItems, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import DropZone from '../shared/DropZone';
import ReorderItem from './ReorderItem';

export default function DraggableList({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);

  useEffect(() => {
    setItems(isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4));
  }, [isGrid, testSettings.itemCount]);

  const axis = isGrid ? 'x' : 'y';
  const slotSize = isGrid ? 130 : 68;

  return (
    <DropZone variant={isGrid ? 'grid' : 'list'}>
      {items.map((item, index) => (
        <ReorderItem
          key={item.id}
          item={item}
          index={index}
          count={items.length}
          axis={axis}
          slotSize={slotSize}
          restrict={!!testSettings.restrictToContainer}
          onReorder={(from, to) => setItems((current) => reorder(current, from, to))}
        />
      ))}
    </DropZone>
  );
}