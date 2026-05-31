import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { createColumns, createTaskItems, createTileItems, initialColumns, initialTasks, initialTiles, moveCard, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import DragItemCard from './shared/DragItemCard';
import DropZone from './shared/DropZone';
import KanbanColumnShell from './shared/KanbanColumnShell';

function Card({ item, provided, snapshot }) {
  return (
    <DragItemCard
      title={item.title}
      meta={item.meta}
      isDragging={snapshot.isDragging}
      rootRef={provided.innerRef}
      rootProps={{ ...provided.draggableProps, ...provided.dragHandleProps }}
      draggingClassName="rotate-1 scale-[1.03] shadow-2xl ring-2 ring-primary/20"
    />
  );
}

export default function HelloPangeaDemo({ useCase, testSettings = {} }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));
  const [tiles, setTiles] = useState(initialTiles);

  useEffect(() => {
    if (useCase === 'grid') setTiles(createTileItems(testSettings.itemCount || 6));
    if (useCase === 'sortable' || useCase === 'nested') setTasks(createTaskItems(testSettings.itemCount || 4));
  }, [useCase, testSettings.itemCount]);

  useEffect(() => {
    if (useCase === 'kanban') setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [useCase, testSettings.cardsPerColumn]);

  const activeItems = useCase === 'grid' ? tiles : tasks;

  const onListEnd = (result) => {
    if (!result.destination) return;
    const next = reorder(activeItems, result.source.index, result.destination.index);
    useCase === 'grid' ? setTiles(next) : setTasks(next);
  };

  const onKanbanEnd = (result) => {
    if (!result.destination) return;
    if (result.type === 'COLUMN') {
      setColumnOrder((current) => reorder(current, result.source.index, result.destination.index));
      return;
    }
    setColumns(moveCard(columns, result.source, result.destination));
  };

  if (useCase === 'canvas' || useCase === 'file') {
    return <CapabilityNote>@hello-pangea/dnd is intentionally list-first. This test exposes an important limitation: choose dnd-kit or react-dnd for {useCase === 'canvas' ? 'coordinate-based free-form canvases' : 'native file payloads'}.</CapabilityNote>;
  }

  if (useCase === 'kanban') {
    return (
      <DragDropContext onDragEnd={onKanbanEnd}>
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
                                {(provided, snapshot) => <Card item={item} provided={provided} snapshot={snapshot} />}
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

  return (
    <>
      {useCase === 'nested' && <CapabilityNote>Nested structures are possible, but this library works best when hierarchy is simplified into clear droppable zones.</CapabilityNote>}
      <DragDropContext onDragEnd={onListEnd}>
        <Droppable droppableId="list" direction={useCase === 'grid' ? 'horizontal' : 'vertical'}>
          {(provided, snapshot) => (
            <DropZone dropRef={provided.innerRef} dropProps={provided.droppableProps} isOver={snapshot.isDraggingOver} variant={useCase === 'grid' ? 'grid' : 'list'}>
              {activeItems.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided, snapshot) => <Card item={item} provided={provided} snapshot={snapshot} />}
                </Draggable>
              ))}
              {provided.placeholder}
            </DropZone>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}