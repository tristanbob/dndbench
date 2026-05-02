import React, { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';
import { initialColumns, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import CanvasSurface from './shared/CanvasSurface';
import DragItemCard from './shared/DragItemCard';
import DropZone from './shared/DropZone';
import FileDropSurface from './shared/FileDropSurface';
import KanbanColumnShell from './shared/KanbanColumnShell';

const CARD = 'card';
const COLUMN = 'column';

function DragCard({ item, index, moveItem, settings }) {
  const cardRef = useRef(null);
  const handleRef = useRef(null);
  const [, drop] = useDrop({ accept: CARD, hover: (dragged) => { if (dragged.index !== index) { moveItem(dragged.index, index); dragged.index = index; } } });
  const [{ isDragging }, drag] = useDrag({ type: CARD, item: { id: item.id, index }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  const connectCard = (node) => {
    cardRef.current = node;
    drop(node);
    if (!settings?.dragHandle) drag(node);
  };
  const connectHandle = (node) => {
    handleRef.current = node;
    if (settings?.dragHandle) drag(node);
  };

  return <DragItemCard title={item.title} meta={item.meta} isDragging={isDragging} rootRef={connectCard} handleRef={connectHandle} showHandle={settings?.dragHandle} draggingClassName="opacity-40 ring-2 ring-primary/20" />;
}

function DragColumn({ columnId, index, cards, settings, moveColumn, setColumns }) {
  const columnRef = useRef(null);
  const handleRef = useRef(null);
  const [, dropColumn] = useDrop({ accept: COLUMN, hover: (dragged) => { if (dragged.index !== index) { moveColumn(dragged.index, index); dragged.index = index; } } });
  const [{ isCardZoneOver }, dropCardZone] = useDrop({ accept: CARD, collect: (monitor) => ({ isCardZoneOver: monitor.isOver() }) });
  const [{ isDragging }, drag] = useDrag({ type: COLUMN, item: { id: columnId, index }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  const connectColumn = (node) => {
    columnRef.current = node;
    dropColumn(node);
    if (!settings?.dragHandle) drag(node);
  };
  const connectHandle = (node) => {
    handleRef.current = node;
    if (settings?.dragHandle) drag(node);
  };

  return <KanbanColumnShell title={columnId} isDragging={isDragging} rootRef={connectColumn} handleRef={connectHandle} showHandle={settings?.dragHandle}><div ref={dropCardZone} className={`min-h-52 space-y-3 rounded-2xl transition-colors ${isCardZoneOver ? 'bg-muted/60' : ''}`}>{cards.map((card, cardIndex) => <DragCard key={card.id} item={card} index={cardIndex} settings={settings} moveItem={(from, to) => setColumns((current) => ({ ...current, [columnId]: reorder(current[columnId], from, to) }))} />)}</div></KanbanColumnShell>;
}

function FileDrop({ settings }) {
  const [files, setFiles] = useState([]);
  const [{ isOver }, drop] = useDrop({ accept: [NativeTypes.FILE], drop: (item) => setFiles(item.files.map((file) => file.name)), collect: (monitor) => ({ isOver: monitor.isOver() }) });
  return <FileDropSurface dropRef={drop} title="Drop native files" active={settings?.nativeFileDrop} isOver={isOver} message={files.length ? files.join(', ') : settings?.nativeFileDrop ? 'Native file drop is active.' : 'react-dnd handles native file payloads directly.'} />;
}

function Canvas({ settings }) {
  const [blocks, setBlocks] = useState([{ id: 'a', title: 'Component', x: 30, y: 40 }, { id: 'b', title: 'Asset', x: 210, y: 120 }, { id: 'c', title: 'Rule', x: 120, y: 245 }]);
  const [, drop] = useDrop({ accept: CARD, drop: (item, monitor) => { const delta = monitor.getDifferenceFromInitialOffset(); if (!delta) return; setBlocks((current) => current.map((block) => block.id === item.id ? { ...block, x: block.x + delta.x, y: block.y + delta.y } : block)); } });
  return <CanvasSurface surfaceRef={drop}>{blocks.map((block) => <CanvasBlock key={block.id} block={block} settings={settings} />)}</CanvasSurface>;
}

function CanvasBlock({ block, settings }) {
  const blockRef = useRef(null);
  const handleRef = useRef(null);
  const [{ isDragging }, drag] = useDrag({ type: CARD, item: { id: block.id }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  const connectBlock = (node) => {
    blockRef.current = node;
    if (!settings?.dragHandle) drag(node);
  };
  const connectHandle = (node) => {
    handleRef.current = node;
    if (settings?.dragHandle) drag(node);
  };

  return <DragItemCard title={block.title} isDragging={isDragging} rootRef={connectBlock} handleRef={connectHandle} showHandle={settings?.dragHandle} style={{ left: block.x, top: block.y }} className="absolute bg-card px-5 py-4 shadow-xl" draggingClassName="opacity-50" />;
}

function InnerDemo({ useCase, settings }) {
  const [items, setItems] = useState(initialTasks);
  const [tiles, setTiles] = useState(initialTiles);
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));
  const activeItems = useCase === 'grid' ? tiles : items;
  const setActiveItems = useCase === 'grid' ? setTiles : setItems;
  const moveItem = (from, to) => setActiveItems((current) => reorder(current, from, to));
  const moveColumn = (from, to) => setColumnOrder((current) => reorder(current, from, to));

  if (useCase === 'file') return <FileDrop settings={settings} />;
  if (useCase === 'canvas') return <Canvas settings={settings} />;
  if (useCase === 'kanban') return <><CapabilityNote>react-dnd can power Kanban well, but it requires more custom wiring than list-first tools.</CapabilityNote><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{columnOrder.map((columnId, index) => <DragColumn key={columnId} columnId={columnId} index={index} cards={columns[columnId]} settings={settings} moveColumn={moveColumn} setColumns={setColumns} />)}</div></>;

  return <>{useCase === 'nested' && <CapabilityNote>react-dnd is excellent for nested drag rules because every source and target can define custom acceptance logic.</CapabilityNote>}<DropZone variant={useCase === 'grid' ? 'grid' : 'list'}>{activeItems.map((item, index) => <DragCard key={item.id} item={item} index={index} moveItem={moveItem} settings={settings} />)}</DropZone></>;
}

export default function ReactDndDemo({ useCase, settings }) {
  return <DndProvider backend={HTML5Backend}><InnerDemo useCase={useCase} settings={settings} /></DndProvider>;
}