import React, { useState } from 'react';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { initialColumns, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import DraggableCard from './DraggableCard';

function SortableItem({ item, settings }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const lockedTransform = settings?.axisLock && transform ? { ...transform, x: 0 } : transform;
  return <DraggableCard title={item.title} meta={item.meta} isDragging={isDragging} refProp={setNodeRef} attributes={attributes} listeners={listeners} handleOnly={settings?.dragHandle} style={{ transform: CSS.Transform.toString(lockedTransform), transition }} />;
}

function SortableColumn({ columnId, cards, settings }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: `column-${columnId}` });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} className={`min-h-72 rounded-3xl border bg-background/70 p-4 transition-[background-color,border-color,box-shadow,opacity] ${isDragging ? 'opacity-60 ring-2 ring-primary/20' : 'hover:bg-muted/30 hover:ring-2 hover:ring-primary/10'}`}>
      <p {...listeners} className="mb-4 cursor-grab text-sm font-semibold capitalize active:cursor-grabbing">{columnId}</p>
      <SortableContext items={cards.map((card) => card.id)}>
        <div className="space-y-3">
          {cards.map((card) => <SortableItem key={card.id} item={card} settings={settings} />)}
        </div>
      </SortableContext>
    </div>
  );
}

function CanvasBlock({ id, title, position, settings }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const lockedTransform = settings?.axisLock && transform ? { ...transform, y: 0 } : transform;
  const style = { left: position.x, top: position.y, transform: CSS.Translate.toString(lockedTransform) };
  return <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="absolute cursor-grab rounded-2xl border bg-card px-5 py-4 shadow-xl active:cursor-grabbing">{title}</div>;
}

export default function DndKitDemo({ useCase, settings }) {
  const [items, setItems] = useState(initialTasks);
  const [tiles, setTiles] = useState(initialTiles);
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));
  const [positions, setPositions] = useState({ blockA: { x: 28, y: 36 }, blockB: { x: 220, y: 120 }, blockC: { x: 110, y: 230 } });
  const [droppedFiles, setDroppedFiles] = useState([]);
  const { setNodeRef, isOver } = useDroppable({ id: 'file-zone' });
  const pointerSensor = useSensor(PointerSensor);
  const keyboardSensor = useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates });
  const sensors = useSensors(pointerSensor, keyboardSensor);

  const sortableItems = useCase === 'grid' ? tiles : items;
  const setSortableItems = useCase === 'grid' ? setTiles : setItems;

  const handleSortEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = sortableItems.findIndex((item) => item.id === active.id);
    const newIndex = sortableItems.findIndex((item) => item.id === over.id);
    setSortableItems(arrayMove(sortableItems, oldIndex, newIndex));
  };

  const handleCanvasEnd = ({ active, delta }) => {
    setPositions((current) => {
      const currentPosition = current[active.id];
      const nextX = settings?.axisLock ? currentPosition.x + delta.x : currentPosition.x + delta.x;
      const nextY = settings?.axisLock ? currentPosition.y : currentPosition.y + delta.y;
      return { ...current, [active.id]: { x: settings?.restrictToContainer ? Math.max(0, Math.min(320, nextX)) : nextX, y: settings?.restrictToContainer ? Math.max(0, Math.min(300, nextY)) : nextY } };
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

    const sourceId = Object.keys(columns).find((key) => columns[key].some((item) => item.id === active.id));
    const targetId = Object.keys(columns).find((key) => key === over.id || columns[key].some((item) => item.id === over.id));
    if (!sourceId || !targetId) return;
    const moving = columns[sourceId].find((item) => item.id === active.id);
    setColumns((current) => ({
      ...current,
      [sourceId]: current[sourceId].filter((item) => item.id !== active.id),
      [targetId]: [...current[targetId].filter((item) => item.id !== active.id), moving]
    }));
  };

  if (useCase === 'canvas') {
    return <DndContext sensors={sensors} onDragEnd={handleCanvasEnd}><div className="relative h-[380px] overflow-hidden rounded-3xl border bg-muted/40"><CanvasBlock id="blockA" title="Persona map" position={positions.blockA} settings={settings} /><CanvasBlock id="blockB" title="Flow node" position={positions.blockB} settings={settings} /><CanvasBlock id="blockC" title="Metric card" position={positions.blockC} settings={settings} /></div></DndContext>;
  }

  if (useCase === 'file') {
    return <><CapabilityNote>dnd-kit can detect drops, but native file extraction usually needs browser drop events or another layer.</CapabilityNote><div ref={setNodeRef} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); setDroppedFiles(Array.from(e.dataTransfer.files).map((file) => file.name)); }} className={`rounded-3xl border border-dashed p-10 text-center transition-colors ${isOver ? 'bg-muted' : 'bg-background/70'}`}><p className="text-lg font-semibold">Drop files here</p><p className="mt-2 text-sm text-muted-foreground">{droppedFiles.length ? droppedFiles.join(', ') : 'Uses native browser file events beside dnd-kit.'}</p></div></>;
  }

  if (useCase === 'kanban') {
    return <DndContext sensors={sensors} collisionDetection={settings?.collisionDetection ? closestCenter : undefined} onDragEnd={handleKanbanEnd}><SortableContext items={columnOrder.map((columnId) => `column-${columnId}`)} strategy={rectSortingStrategy}><div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${settings?.restrictToContainer ? 'overflow-hidden rounded-3xl ring-2 ring-primary/10' : ''}`}>{columnOrder.map((columnId) => <SortableColumn key={columnId} columnId={columnId} cards={columns[columnId]} settings={settings} />)}</div></SortableContext></DndContext>;
  }

  return (
    <>
      {useCase === 'nested' && <CapabilityNote>dnd-kit is a strong fit for nested interactions when you model tree rules explicitly.</CapabilityNote>}
      <DndContext sensors={sensors} collisionDetection={settings?.collisionDetection ? closestCenter : undefined} onDragEnd={handleSortEnd}>
        <SortableContext items={sortableItems.map((item) => item.id)} strategy={useCase === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}>
          <div className={`${useCase === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-3'} rounded-3xl border bg-background/70 p-4 ${settings?.restrictToContainer ? 'overflow-hidden ring-2 ring-primary/10' : ''}`}>
            {sortableItems.map((item) => <SortableItem key={item.id} item={item} settings={settings} />)}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}