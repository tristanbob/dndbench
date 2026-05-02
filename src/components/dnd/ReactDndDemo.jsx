import React, { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';
import { initialColumns, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';

const CARD = 'card';

function DragCard({ item, index, moveItem, settings }) {
  const cardRef = useRef(null);
  const handleRef = useRef(null);
  const [, drop] = useDrop({ accept: CARD, hover: (dragged) => { if (dragged.index !== index) { moveItem(dragged.index, index); dragged.index = index; } } });
  const [{ isDragging }, drag] = useDrag({ type: CARD, item: { id: item.id, index }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  drop(cardRef);
  drag(settings?.dragHandle ? handleRef : cardRef);

  return <div ref={cardRef} className={`flex items-center justify-between gap-3 rounded-2xl border bg-background p-4 shadow-sm transition-all ${isDragging ? 'opacity-40' : 'hover:-translate-y-0.5'}`}><div><p className="font-medium">{item.title}</p>{item.meta && <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>}</div><button ref={handleRef} type="button" className="rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-muted">Drag</button></div>;
}

function FileDrop({ settings }) {
  const [files, setFiles] = useState([]);
  const [{ isOver }, drop] = useDrop({ accept: [NativeTypes.FILE], drop: (item) => setFiles(item.files.map((file) => file.name)), collect: (monitor) => ({ isOver: monitor.isOver() }) });
  return <div ref={drop} className={`rounded-3xl border border-dashed p-10 text-center transition-colors ${settings?.nativeFileDrop ? 'ring-2 ring-primary/10' : ''} ${isOver ? 'bg-muted' : 'bg-background/70'}`}><p className="text-lg font-semibold">Drop native files</p><p className="mt-2 text-sm text-muted-foreground">{files.length ? files.join(', ') : settings?.nativeFileDrop ? 'Native file drop is active.' : 'react-dnd handles native file payloads directly.'}</p></div>;
}

function Canvas() {
  const [blocks, setBlocks] = useState([{ id: 'a', title: 'Component', x: 30, y: 40 }, { id: 'b', title: 'Asset', x: 210, y: 120 }, { id: 'c', title: 'Rule', x: 120, y: 245 }]);
  const [, drop] = useDrop({ accept: CARD, drop: (item, monitor) => { const delta = monitor.getDifferenceFromInitialOffset(); if (!delta) return; setBlocks((current) => current.map((block) => block.id === item.id ? { ...block, x: block.x + delta.x, y: block.y + delta.y } : block)); } });
  return <div ref={drop} className="relative h-[380px] overflow-hidden rounded-3xl border bg-muted/40">{blocks.map((block) => <CanvasBlock key={block.id} block={block} />)}</div>;
}

function CanvasBlock({ block }) {
  const [{ isDragging }, drag] = useDrag({ type: CARD, item: { id: block.id }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  return <div ref={drag} style={{ left: block.x, top: block.y }} className={`absolute cursor-grab rounded-2xl border bg-card px-5 py-4 shadow-xl ${isDragging ? 'opacity-50' : ''}`}>{block.title}</div>;
}

function InnerDemo({ useCase, settings }) {
  const [items, setItems] = useState(initialTasks);
  const [tiles, setTiles] = useState(initialTiles);
  const [columns, setColumns] = useState(initialColumns);
  const activeItems = useCase === 'grid' ? tiles : items;
  const setActiveItems = useCase === 'grid' ? setTiles : setItems;
  const moveItem = (from, to) => setActiveItems((current) => reorder(current, from, to));

  if (useCase === 'file') return <FileDrop settings={settings} />;
  if (useCase === 'canvas') return <Canvas />;
  if (useCase === 'kanban') return <><CapabilityNote>react-dnd can power Kanban well, but it requires more custom wiring than list-first tools.</CapabilityNote><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{Object.entries(columns).map(([key, cards]) => <div key={key} className="min-h-72 rounded-3xl border bg-background/70 p-4"><p className="mb-4 text-sm font-semibold capitalize">{key}</p><div className="space-y-3">{cards.map((card, index) => <DragCard key={card.id} item={card} index={index} settings={settings} moveItem={(from, to) => setColumns((current) => ({ ...current, [key]: reorder(current[key], from, to) }))} />)}</div></div>)}</div></>;

  return <>{useCase === 'nested' && <CapabilityNote>react-dnd is excellent for nested drag rules because every source and target can define custom acceptance logic.</CapabilityNote>}<div className={`${useCase === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-3'} rounded-3xl border bg-background/70 p-4`}>{activeItems.map((item, index) => <DragCard key={item.id} item={item} index={index} moveItem={moveItem} settings={settings} />)}</div></>;
}

export default function ReactDndDemo({ useCase, settings }) {
  return <DndProvider backend={HTML5Backend}><InnerDemo useCase={useCase} settings={settings} /></DndProvider>;
}