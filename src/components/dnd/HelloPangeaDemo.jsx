import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { initialColumns, initialTasks, initialTiles, moveCard, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';

function Card({ item, provided, snapshot, settings }) {
  const handleProps = settings?.dragHandle ? {} : provided.dragHandleProps;

  return (
    <div ref={provided.innerRef} {...provided.draggableProps} {...handleProps} className={`rounded-2xl border bg-background p-4 shadow-sm transition-[background-color,border-color,box-shadow,opacity] ${snapshot.isDragging ? 'rotate-1 scale-[1.03] shadow-2xl ring-2 ring-primary/20' : 'hover:bg-muted/40 hover:ring-2 hover:ring-primary/10 hover:shadow-md'}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium">{item.title}</p>
          {item.meta && <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>}
        </div>
        {settings?.dragHandle && <span {...provided.dragHandleProps} className="rounded-lg p-1 text-muted-foreground hover:bg-muted"><GripVertical className="h-4 w-4" /></span>}
      </div>
    </div>
  );
}

export default function HelloPangeaDemo({ useCase, settings }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));
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
            <div ref={columnDrop.innerRef} {...columnDrop.droppableProps} className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {columnOrder.map((columnId, columnIndex) => (
                <Draggable draggableId={`column-${columnId}`} index={columnIndex} key={columnId}>
                  {(columnDrag) => (
                    <div ref={columnDrag.innerRef} {...columnDrag.draggableProps} className="min-h-72 rounded-3xl border bg-background/70 p-4 transition-[background-color,border-color,box-shadow,opacity] hover:bg-muted/30 hover:ring-2 hover:ring-primary/10">
                      <p {...columnDrag.dragHandleProps} className="mb-4 cursor-grab text-sm font-semibold capitalize tracking-tight active:cursor-grabbing">{columnId}</p>
                      <Droppable droppableId={columnId} type="CARD">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className={`min-h-52 space-y-3 rounded-2xl transition-colors ${snapshot.isDraggingOver ? 'bg-muted/60' : ''}`}>
                            {columns[columnId].map((item, index) => (
                              <Draggable draggableId={item.id} index={index} key={item.id}>
                                {(provided, snapshot) => <Card item={item} provided={provided} snapshot={snapshot} settings={settings} />}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
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