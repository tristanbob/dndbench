import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { createTaskItems, createTileItems, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import DropZone from '../shared/DropZone';
import PangeaCard from './PangeaCard';

export default function PangeaList({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);

  useEffect(() => {
    setItems(isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4));
  }, [isGrid, testSettings.itemCount]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    setItems(reorder(items, result.source.index, result.destination.index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" direction={isGrid ? 'horizontal' : 'vertical'}>
        {(provided, snapshot) => (
          <DropZone dropRef={provided.innerRef} dropProps={provided.droppableProps} isOver={snapshot.isDraggingOver} variant={isGrid ? 'grid' : 'list'}>
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(dragProvided, dragSnapshot) => <PangeaCard item={item} provided={dragProvided} snapshot={dragSnapshot} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </DropZone>
        )}
      </Droppable>
    </DragDropContext>
  );
}