import React, { useEffect, useState } from 'react';
import { createTaskItems, createTileItems, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import DropZone from '../shared/DropZone';
import CapabilityNote from '../CapabilityNote';
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
    <>
      <CapabilityNote>react-draggable provides native x/y movement, so this template maps drag distance back to list order with custom logic.</CapabilityNote>
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
    </>
  );
}