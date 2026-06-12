import React, { useEffect, useRef, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createTaskItems, createTileItems, initialTasks, initialTiles } from '@/utils/dndHelpers';
import DropZone from '../shared/DropZone';
import SortableItem from './SortableItem';
import useDndSensors from './useDndSensors';
import makeRestrictToBoundsModifier from './restrictToBounds';

const noop = () => {};

export default function DndKitList({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const sensors = useDndSensors();

  useEffect(() => {
    setItems(isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4));
  }, [isGrid, testSettings.itemCount]);

  const restrict = !!testSettings.restrictToContainer;
  const modifiers = restrict ? [makeRestrictToBoundsModifier(containerRef, restrict)] : [];

  const handleEnd = ({ active, over }) => {
    setIsDragging(false);
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} modifiers={modifiers} onDragStart={() => setIsDragging(true)} onDragOver={noop} onDragEnd={handleEnd} onDragCancel={() => setIsDragging(false)}>
      <SortableContext items={items.map((item) => item.id)} strategy={isGrid ? rectSortingStrategy : verticalListSortingStrategy}>
        <DropZone dropRef={containerRef} isOver={isDragging} variant={isGrid ? 'grid' : 'list'}>
          {items.map((item) => <SortableItem key={item.id} item={item} />)}
        </DropZone>
      </SortableContext>
    </DndContext>
  );
}