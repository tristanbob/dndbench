import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { createColumns, initialColumns, moveCard, reorder } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import PangeaCard from './PangeaCard';

export default function PangeaKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));

  useEffect(() => {
    setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [testSettings.cardsPerColumn]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.type === 'COLUMN') {
      setColumnOrder((current) => reorder(current, result.source.index, result.destination.index));
      return;
    }
    setColumns(moveCard(columns, result.source, result.destination));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="kanban-columns" direction="horizontal" type="COLUMN">
        {(columnDrop) => (
          <div ref={columnDrop.innerRef} {...columnDrop.droppableProps} className="grid grid-cols-1 gap-4 p-1 md:grid-cols-3">
            {columnOrder.map((columnId, columnIndex) => (
              <Draggable draggableId={`column-${columnId}`} index={columnIndex} key={columnId}>
                {(columnDrag) => (
                  <KanbanColumnShell title={columnId} rootRef={columnDrag.innerRef} rootProps={{ ...columnDrag.draggableProps, ...columnDrag.dragHandleProps }}>
                    <Droppable droppableId={columnId} type="CARD">
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-52 space-y-3 rounded-2xl transition-colors ${snapshot.isDraggingOver ? 'bg-muted/60' : ''}`}>
                          {columns[columnId].map((item, index) => (
                            <Draggable draggableId={item.id} index={index} key={item.id}>
                              {(dragProvided, dragSnapshot) => <PangeaCard item={item} provided={dragProvided} snapshot={dragSnapshot} />}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </KanbanColumnShell>
                )}
              </Draggable>
            ))}
            {columnDrop.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}