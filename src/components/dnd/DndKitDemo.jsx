import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, sortableKeyboardCoordinates, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { initialColumns, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import DraggableCard from './DraggableCard';

const lockTransform = (transform, axisLock) => {
  if (!transform || axisLock === 'none') return transform;
  if (axisLock === 'horizontal') return { ...transform, y: 0 };
  if (axisLock === 'vertical') return { ...transform, x: 0 };
  return transform;
};

const horizontalAxisModifier = ({ transform }) => ({ ...transform, y: 0 });
const verticalAxisModifier = ({ transform }) => ({ ...transform, x: 0 });

const getAxisModifiers = (axisLock) => {
  if (axisLock === 'horizontal') return [horizontalAxisModifier];
  if (axisLock === 'vertical') return [verticalAxisModifier];
  return [];
};

function SortableItem({ item, settings }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const lockedTransform = lockTransform(transform, settings?.axisLock);
  return <DraggableCard title={item.title} meta={item.meta} isDragging={isDragging} refProp={setNodeRef} attributes={attributes} listeners={listeners} handleOnly={settings?.dragHandle} style={{ transform: CSS.Transform.toString(lockedTransform), transition }} />;
}

function SortableColumn({ columnId, cards, settings }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: `column-${columnId}` });
  const { setNodeRef: setDropZoneRef, isOver: isDropZoneOver } = useDroppable({ id: columnId });
  const rootListeners = settings?.dragHandle ? {} : listeners;
  const handleListeners = settings?.dragHandle ? listeners : {};

  const lockedTransform = lockTransform(transform, settings?.axisLock);

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(lockedTransform), transition }} {...attributes} {...rootListeners} className={`min-h-72 rounded-3xl border bg-background/70 p-4 transition-[background-color,border-color,box-shadow,opacity] ${isDragging ? 'opacity-60 ring-2 ring-primary/20' : 'hover:bg-muted/30 hover:ring-2 hover:ring-primary/10'}`}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold capitalize">{columnId}</p>
        {settings?.dragHandle && <button type="button" {...handleListeners} className="rounded-lg p-1 text-muted-foreground hover:bg-muted"><GripVertical className="h-4 w-4" /></button>}
      </div>
      <SortableContext items={cards.map((card) => card.id)}>
        <div ref={setDropZoneRef} className={`min-h-52 space-y-3 rounded-2xl transition-colors ${isDropZoneOver ? 'bg-muted/60' : ''}`}>
          {cards.map((card) => <SortableItem key={card.id} item={card} settings={settings} />)}
        </div>
      </SortableContext>
    </div>
  );
}

function CanvasBlock({ id, title, position, settings }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const lockedTransform = lockTransform(transform, settings?.axisLock);
  const style = { left: position.x, top: position.y, transform: CSS.Transform.toString(lockedTransform) };
  const rootListeners = settings?.dragHandle ? {} : listeners;
  const handleListeners = settings?.dragHandle ? listeners : {};

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...rootListeners} className="absolute flex items-center gap-3 rounded-2xl border bg-card px-5 py-4 shadow-xl">
      <span>{title}</span>
      {settings?.dragHandle && <button type="button" {...handleListeners} className="rounded-lg p-1 text-muted-foreground hover:bg-muted"><GripVertical className="h-4 w-4" /></button>}
    </div>
  );
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
  const axisModifiers = getAxisModifiers(settings?.axisLock);

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
      const nextX = settings?.axisLock === 'vertical' ? currentPosition.x : currentPosition.x + delta.x;
      const nextY = settings?.axisLock === 'horizontal' ? currentPosition.y : currentPosition.y + delta.y;
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
    return <DndContext sensors={sensors} modifiers={axisModifiers} onDragEnd={handleCanvasEnd}><div className="relative h-[380px] overflow-hidden rounded-3xl border bg-muted/40"><CanvasBlock id="blockA" title="Persona map" position={positions.blockA} settings={settings} /><CanvasBlock id="blockB" title="Flow node" position={positions.blockB} settings={settings} /><CanvasBlock id="blockC" title="Metric card" position={positions.blockC} settings={settings} /></div></DndContext>;
  }

  if (useCase === 'file') {
    return <><CapabilityNote>dnd-kit can detect drops, but native file extraction usually needs browser drop events or another layer.</CapabilityNote><div ref={setNodeRef} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); setDroppedFiles(Array.from(e.dataTransfer.files).map((file) => file.name)); }} className={`rounded-3xl border border-dashed p-10 text-center transition-colors ${isOver ? 'bg-muted' : 'bg-background/70'}`}><p className="text-lg font-semibold">Drop files here</p><p className="mt-2 text-sm text-muted-foreground">{droppedFiles.length ? droppedFiles.join(', ') : 'Uses native browser file events beside dnd-kit.'}</p></div></>;
  }

  if (useCase === 'kanban') {
    return <DndContext sensors={sensors} modifiers={axisModifiers} collisionDetection={settings?.collisionDetection ? closestCenter : undefined} onDragEnd={handleKanbanEnd}><SortableContext items={columnOrder.map((columnId) => `column-${columnId}`)} strategy={rectSortingStrategy}><div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${settings?.restrictToContainer ? 'overflow-hidden rounded-3xl ring-2 ring-primary/10' : ''}`}>{columnOrder.map((columnId) => <SortableColumn key={columnId} columnId={columnId} cards={columns[columnId]} settings={settings} />)}</div></SortableContext></DndContext>;
  }

  return (
    <>
      {useCase === 'nested' && <CapabilityNote>dnd-kit is a strong fit for nested interactions when you model tree rules explicitly.</CapabilityNote>}
      <DndContext sensors={sensors} modifiers={axisModifiers} collisionDetection={settings?.collisionDetection ? closestCenter : undefined} onDragEnd={handleSortEnd}>
        <SortableContext items={sortableItems.map((item) => item.id)} strategy={useCase === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}>
          <div className={`${useCase === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-3'} rounded-3xl border bg-background/70 p-4 ${settings?.restrictToContainer ? 'overflow-hidden ring-2 ring-primary/10' : ''}`}>
            {sortableItems.map((item) => <SortableItem key={item.id} item={item} settings={settings} />)}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}