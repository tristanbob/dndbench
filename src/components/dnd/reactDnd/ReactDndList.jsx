import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { createTaskItems, createTileItems, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import DropZone from '../shared/DropZone';
import DragCard from './DragCard';
import { CARD } from './itemTypes';

export default function ReactDndList({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);
  const [{ isListOver }, dropListZone] = useDrop({ accept: CARD, collect: (monitor) => ({ isListOver: monitor.isOver() }) });

  useEffect(() => {
    setItems(isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4));
  }, [isGrid, testSettings.itemCount]);

  const moveItem = (from, to) => setItems((current) => reorder(current, from, to));

  return (
    <DropZone dropRef={dropListZone} isOver={isListOver} variant={isGrid ? 'grid' : 'list'}>
      {items.map((item, index) => <DragCard key={item.id} item={item} index={index} columnId="list" moveItem={moveItem} />)}
    </DropZone>
  );
}