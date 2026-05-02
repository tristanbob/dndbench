import React, { useState } from 'react';
import { closestCenter, DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { initialColumns, initialTasks, initialTiles } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import DraggableCard from './DraggableCard';

function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  return <DraggableCard title={item.title} meta={item.meta} isDragging={isDragging} refProp={setNodeRef} attributes={attributes} listeners={listeners} style={{ transform: CSS.Transform.toString(transform), transition }} />;
}

function CanvasBlock({ id, title, position }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const style = { left: position.x, top: position.y, transform: CSS.Translate.toString(transform) };
  return <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="absolute cursor-grab rounded-2xl border bg-card px-5 py-4 shadow-xl active:cursor-grabbing">{title}</div>;
}

export default function DndKitDemo({ useCase }) {
  const [items, setItems] = useState(initialTasks);
  const [tiles, setTiles] = useState(initialTiles);
  const [columns, setColumns] = useState(initialColumns);
  const [positions, setPositions] = useState({ blockA: { x: 28, y: 36 }, blockB: { x: 220, y: 120 }, blockC: { x: 110, y: 230 } });
  const [droppedFiles, setDroppedFiles] = useState([]);
  const { setNodeRef, isOver } = useDroppable({ id: 'file-zone' });

  const sortableItems = useCase === 'grid' ? tiles : items;
  const setSortableItems = useCase === 'grid' ? setTiles : setItems;

  const handleSortEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const oldIndex = sortableItems.findIndex((item) => item.id === active.id);
    const newIndex = sortableItems.findIndex((item) => item.id === over.id);
    setSortableItems(arrayMove(sortableItems, oldIndex, newIndex));
  };

  const handleCanvasEnd = ({ active, delta }) => {
    setPositions((current) => ({ ...current, [active.id]: { x: current[active.id].x + delta.x, y: current[active.id].y + delta.y } }));
  };

  const handleKanbanEnd = ({ active, over }) => {
    if (!over) return;
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
    return <DndContext onDragEnd={handleCanvasEnd}><div className="relative h-[380px] overflow-hidden rounded-3xl border bg-muted/40"><CanvasBlock id="blockA" title="Persona map" position={positions.blockA} /><CanvasBlock id="blockB" title="Flow node" position={positions.blockB} /><CanvasBlock id="blockC" title="Metric card" position={positions.blockC} /></div></DndContext>;
  }

  if (useCase === 'file') {
    return <><CapabilityNote>dnd-kit can detect drops, but native file extraction usually needs browser drop events or another layer.</CapabilityNote><div ref={setNodeRef} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); setDroppedFiles(Array.from(e.dataTransfer.files).map((file) => file.name)); }} className={`rounded-3xl border border-dashed p-10 text-center transition-colors ${isOver ? 'bg-muted' : 'bg-background/70'}`}><p className="text-lg font-semibold">Drop files here</p><p className="mt-2 text-sm text-muted-foreground">{droppedFiles.length ? droppedFiles.join(', ') : 'Uses native browser file events beside dnd-kit.'}</p></div></>;
  }

  if (useCase === 'kanban') {
    return <DndContext collisionDetection={closestCenter} onDragEnd={handleKanbanEnd}><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{Object.entries(columns).map(([columnId, cards]) => <SortableContext key={columnId} items={cards.map((card) => card.id)}><div className="min-h-72 rounded-3xl border bg-background/70 p-4"><p className="mb-4 text-sm font-semibold capitalize">{columnId}</p><div className="space-y-3">{cards.map((card) => <SortableItem key={card.id} item={card} />)}</div></div></SortableContext>)}</div></DndContext>;
  }

  return (
    <>
      {useCase === 'nested' && <CapabilityNote>dnd-kit is a strong fit for nested interactions when you model tree rules explicitly.</CapabilityNote>}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleSortEnd}>
        <SortableContext items={sortableItems.map((item) => item.id)} strategy={useCase === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}>
          <div className={`${useCase === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-3'} rounded-3xl border bg-background/70 p-4`}>
            {sortableItems.map((item) => <SortableItem key={item.id} item={item} />)}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}