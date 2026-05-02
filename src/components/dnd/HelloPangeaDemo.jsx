import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { initialColumns, initialTasks, initialTiles, moveCard, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';

function Card({ item, provided, snapshot, settings }) {
  const handleProps = settings?.dragHandle ? {} : provided.dragHandleProps;

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...handleProps} className={`rounded-2xl border bg-background p-4 shadow-sm transition-all ${snapshot.isDragging ? 'rotate-1 scale-[1.03] shadow-2xl' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">{item.title}</p>
          {item.meta && <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>}
        </div>
        {settings?.dragHandle && <button type="button" {...provided.dragHandleProps} className="rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-muted">Drag</button>}
      </div>
    </div>
  );
}

export default function HelloPangeaDemo({ useCase, settings }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [tiles, setTiles] = useState(initialTiles);

  const isListLike = ['sortable', 'grid', 'nested'].includes(useCase);
  const activeItems = useCase === 'grid' ? tiles : tasks;

  const onListEnd = (result) => {
    if (!result.destination) return;
    const next = reorder(activeItems, result.source.index, result.destination.index);
    useCase === 'grid' ? setTiles(next) : setTasks(next);
  };

  const onKanbanEnd = (result) => {
    if (!result.destination) return;
    setColumns(moveCard(columns, result.source, result.destination));
  };

  if (useCase === 'canvas' || useCase === 'file') {
    return <CapabilityNote>@hello-pangea/dnd is intentionally list-first. This test exposes an important limitation: choose dnd-kit or react-dnd for {useCase === 'canvas' ? 'coordinate-based free-form canvases' : 'native file payloads'}.</CapabilityNote>;
  }

  if (useCase === 'kanban') {
    return (
      <DragDropContext onDragEnd={onKanbanEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(columns).map(([columnId, items]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-72 rounded-3xl border p-4 transition-colors ${snapshot.isDraggingOver ? 'bg-muted' : 'bg-background/70'}`}>
                  <p className="mb-4 text-sm font-semibold capitalize tracking-tight">{columnId}</p>
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <Draggable draggableId={item.id} index={index} key={item.id}>
                        {(provided, snapshot) => <Card item={item} provided={provided} snapshot={snapshot} settings={settings} />}

                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    );
  }

  return (
    <>
      {useCase === 'nested' && <CapabilityNote>Nested structures are possible, but this library works best when hierarchy is simplified into clear droppable zones.</CapabilityNote>}
      <DragDropContext onDragEnd={onListEnd}>
        <Droppable droppableId="list" direction={useCase === 'grid' ? 'horizontal' : 'vertical'}>
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={`${useCase === 'grid' ? 'grid grid-cols-2 md:grid-cols-3' : 'space-y-3'} rounded-3xl border bg-background/70 p-4 transition-colors ${snapshot.isDraggingOver ? 'bg-muted' : ''}`}>
              {activeItems.map((item, index) => (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided, snapshot) => <Card item={item} provided={provided} snapshot={snapshot} settings={settings} />}

                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}