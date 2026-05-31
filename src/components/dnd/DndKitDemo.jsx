import React, { useEffect, useState } from 'react';
import { DndContext, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createCanvasBlocks, createColumns, createTaskItems, createTileItems, initialColumns, initialTasks, initialTiles } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import DraggableCard from './DraggableCard';
import CanvasSurface from './shared/CanvasSurface';
import DropZone from './shared/DropZone';
import KanbanColumnShell from './shared/KanbanColumnShell';

function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  return <DraggableCard title={item.title} meta={item.meta} isDragging={isDragging} refProp={setNodeRef} attributes={attributes} listeners={listeners} style={{ transform: CSS.Transform.toString(transform), transition }} />;
}

function SortableColumn({ columnId, cards }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: `column-${columnId}` });
  const { setNodeRef: setDropZoneRef, isOver: isDropZoneOver } = useDroppable({ id: columnId });

  return (
    <KanbanColumnShell
      title={columnId}
      isDragging={isDragging}
      rootRef={setNodeRef}
      rootProps={{ ...attributes, ...listeners }}
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      <SortableContext items={cards.map((card) => card.id)}>
        <div ref={setDropZoneRef} className={`min-h-52 space-y-3 rounded-2xl transition-colors ${isDropZoneOver ? 'bg-muted/60' : ''}`}>
          {cards.map((card) => <SortableItem key={card.id} item={card} />)}
        </div>
      </SortableContext>
    </KanbanColumnShell>
  );
}

function CanvasBlock({ id, title, position }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = { left: position.x, top: position.y, transform: CSS.Transform.toString(transform) };
  return (
    <DraggableCard
      title={title}
      isDragging={false}
      refProp={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      style={style}
      className="absolute bg-card px-5 py-4 shadow-xl"
    />
  );
}

export default function DndKitDemo({ useCase, testSettings = {} }) {
  const [items, setItems] = useState(initialTasks);
  const [tiles, setTiles] = useState(initialTiles);
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));
  const [blocks, setBlocks] = useState(createCanvasBlocks(3));
  const [positions, setPositions] = useState(Object.fromEntries(blocks.map((block) => [block.id, { x: block.x, y: block.y }])));
  const [isSortableDragging, setIsSortableDragging] = useState(false);

  useEffect(() => {
    if (useCase === 'grid') setTiles(createTileItems(testSettings.itemCount || 6));
    if (useCase === 'sortable' || useCase === 'nested') setItems(createTaskItems(testSettings.itemCount || 4));
  }, [useCase, testSettings.itemCount]);

  useEffect(() => {
    if (useCase === 'kanban') setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [useCase, testSettings.cardsPerColumn]);

  useEffect(() => {
    if (useCase !== 'canvas') return;
    const nextBlocks = createCanvasBlocks(testSettings.blockCount || 3);
    setBlocks(nextBlocks);
    setPositions(Object.fromEntries(nextBlocks.map((block) => [block.id, { x: block.x, y: block.y }])));
  }, [useCase, testSettings.blockCount]);

  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 8 } });
  const keyboardSensor = useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates });
  const sensors = useSensors(pointerSensor, keyboardSensor);

  const sortableItems = useCase === 'grid' ? tiles : items;
  const setSortableItems = useCase === 'grid' ? setTiles : setItems;

  const handleSortEnd = ({ active, over }) => {
    setIsSortableDragging(false);
    if (!over || active.id === over.id) return;
    const oldIndex = sortableItems.findIndex((item) => item.id === active.id);
    const newIndex = sortableItems.findIndex((item) => item.id === over.id);
    setSortableItems(arrayMove(sortableItems, oldIndex, newIndex));
  };

  const handleCanvasEnd = ({ active, delta }) => {
    setPositions((current) => {
      const currentPosition = current[active.id];
      return { ...current, [active.id]: { x: currentPosition.x + delta.x, y: currentPosition.y + delta.y } };
    });
  };

  const handleKanbanEnd = ({ active, over }) => {
    if (!over) return;
    if (String(active.id).startsWith('column-')) {
      const oldIndex = columnOrder.indexOf(String(active.id).replace('column-', ''));
      const newIndex = columnOrder.indexOf(String(over.id).replace('column-', ''));
      if (oldIndex !== -1 && newIndex !== -1) setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
      return;
    }

    setColumns((current) => {
      const sourceId = Object.keys(current).find((key) => current[key].some((item) => item.id === active.id));
      const targetId = Object.keys(current).find((key) => key === over.id || current[key].some((item) => item.id === over.id));
      if (!sourceId || !targetId) return current;
      if (active.id === over.id || (sourceId === targetId && over.id === sourceId)) return current;

      const originalSourceIndex = current[sourceId].findIndex((item) => item.id === active.id);
      const originalTargetIndex = current[targetId].findIndex((item) => item.id === over.id);
      const moving = current[sourceId].find((item) => item.id === active.id);
      const sourceCards = current[sourceId].filter((item) => item.id !== active.id);
      const targetCards = sourceId === targetId ? sourceCards : current[targetId].filter((item) => item.id !== active.id);
      const hoveredIndex = targetCards.findIndex((item) => item.id === over.id);
      const insertIndex = hoveredIndex === -1 ? targetCards.length : hoveredIndex + (sourceId === targetId && originalSourceIndex < originalTargetIndex ? 1 : 0);

      return {
        ...current,
        [sourceId]: sourceCards,
        [targetId]: [
          ...targetCards.slice(0, insertIndex),
          moving,
          ...targetCards.slice(insertIndex)
        ]
      };
    });
  };

  if (useCase === 'canvas') {
    return <DndContext sensors={sensors} onDragEnd={handleCanvasEnd}><CanvasSurface>{blocks.map((block) => <CanvasBlock key={block.id} id={block.id} title={block.title} position={positions[block.id]} />)}</CanvasSurface></DndContext>;
  }

  if (useCase === 'kanban') {
    return <DndContext sensors={sensors} onDragEnd={handleKanbanEnd}><SortableContext items={columnOrder.map((columnId) => `column-${columnId}`)} strategy={rectSortingStrategy}><div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">{columnOrder.map((columnId) => <SortableColumn key={columnId} columnId={columnId} cards={columns[columnId]} />)}</div></SortableContext></DndContext>;
  }

  return (
    <>
      {useCase === 'nested' && <CapabilityNote>dnd-kit is a strong fit for nested interactions when you model tree rules explicitly.</CapabilityNote>}
      <DndContext sensors={sensors} onDragStart={() => setIsSortableDragging(true)} onDragEnd={handleSortEnd} onDragCancel={() => setIsSortableDragging(false)}>
        <SortableContext items={sortableItems.map((item) => item.id)} strategy={useCase === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}>
          <DropZone isOver={isSortableDragging} variant={useCase === 'grid' ? 'grid' : 'list'}>
            {sortableItems.map((item) => <SortableItem key={item.id} item={item} />)}
          </DropZone>
        </SortableContext>
      </DndContext>
    </>
  );
}