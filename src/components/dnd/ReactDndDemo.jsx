import React, { useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createCanvasBlocks, createColumns, createTaskItems, createTileItems, initialColumns, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import CanvasSurface from './shared/CanvasSurface';
import DragItemCard from './shared/DragItemCard';
import DropZone from './shared/DropZone';
import KanbanColumnShell from './shared/KanbanColumnShell';
import ReactDndDragPreview from './reactDnd/ReactDndDragPreview';

const CARD = 'card';
const COLUMN = 'column';

function DragCard({ item, index, moveItem, moveCardToColumnAt, columnId }) {
  const cardRef = useRef(null);
  const [, drop] = useDrop({ accept: CARD, hover: (dragged) => {
    if (dragged.columnId === columnId) {
      if (dragged.index !== index) { moveItem(dragged.index, index); dragged.index = index; }
    } else if (moveCardToColumnAt) {
      // Cross-column: insert the dragged card at this card's position so siblings open a gap.
      moveCardToColumnAt(dragged.columnId, columnId, dragged.id, index);
      dragged.columnId = columnId;
      dragged.index = index;
    }
  } });
  const [{ isDragging }, drag, preview] = useDrag({ type: CARD, item: () => {
    const rect = cardRef.current?.getBoundingClientRect();
    return { id: item.id, index, columnId, preview: { title: item.title, meta: item.meta, width: rect?.width || 280, sourceX: rect?.left || 0, sourceY: rect?.top || 0 } };
  }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const connectCard = (node) => {
    cardRef.current = node;
    drop(node);
    drag(node);
  };

  return <DragItemCard title={item.title} meta={item.meta} isDragging={isDragging} rootRef={connectCard} draggingClassName="opacity-0" />;
}

function DragColumn({ columnId, index, cards, moveColumn, setColumns, moveCardToColumn, moveCardToColumnAt }) {
  const columnRef = useRef(null);
  const [, dropColumn] = useDrop({ accept: COLUMN, hover: (dragged) => { if (dragged.index !== index) { moveColumn(dragged.index, index); dragged.index = index; } } });
  const [{ isCardZoneOver }, dropCardZone] = useDrop({
    accept: CARD,
    hover: (dragged) => {
      if (dragged.columnId !== columnId) {
        moveCardToColumn(dragged.columnId, columnId, dragged.id);
        dragged.columnId = columnId;
        dragged.index = cards.length;
      }
    },
    collect: (monitor) => ({ isCardZoneOver: monitor.isOver() })
  });
  const [{ isDragging }, drag, preview] = useDrag({ type: COLUMN, item: () => {
    const rect = columnRef.current?.getBoundingClientRect();
    return { id: columnId, index, preview: { title: columnId, cards, width: rect?.width || 280, sourceX: rect?.left || 0, sourceY: rect?.top || 0 } };
  }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const connectColumn = (node) => {
    columnRef.current = node;
    dropColumn(node);
    drag(node);
  };

  return <KanbanColumnShell title={columnId} isDragging={isDragging} rootRef={connectColumn}><div ref={dropCardZone} className={`min-h-52 space-y-3 rounded-2xl transition-colors ${isCardZoneOver ? 'bg-muted/60' : ''}`}>{cards.map((card, cardIndex) => <DragCard key={card.id} item={card} index={cardIndex} columnId={columnId} moveCardToColumnAt={moveCardToColumnAt} moveItem={(from, to) => setColumns((current) => ({ ...current, [columnId]: reorder(current[columnId], from, to) }))} />)}</div></KanbanColumnShell>;
}

function Canvas({ testSettings = {} }) {
  const [blocks, setBlocks] = useState(createCanvasBlocks(testSettings.blockCount || 3));

  useEffect(() => {
    setBlocks(createCanvasBlocks(testSettings.blockCount || 3));
  }, [testSettings.blockCount]);
  const [, drop] = useDrop({ accept: CARD, drop: (item, monitor) => { const delta = monitor.getDifferenceFromInitialOffset(); if (!delta) return; setBlocks((current) => current.map((block) => block.id === item.id ? { ...block, x: block.x + delta.x, y: block.y + delta.y } : block)); } });
  return <CanvasSurface surfaceRef={drop}>{blocks.map((block) => <CanvasBlock key={block.id} block={block} />)}</CanvasSurface>;
}

function CanvasBlock({ block }) {
  const blockRef = useRef(null);
  const [{ isDragging }, drag, preview] = useDrag({ type: CARD, item: () => {
    const rect = blockRef.current?.getBoundingClientRect();
    return { id: block.id, preview: { title: block.title, width: rect?.width || 180, sourceX: rect?.left || 0, sourceY: rect?.top || 0 } };
  }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const connectBlock = (node) => {
    blockRef.current = node;
    drag(node);
  };

  return <DragItemCard title={block.title} isDragging={isDragging} rootRef={connectBlock} style={{ left: block.x, top: block.y }} className="absolute bg-card px-5 py-4 shadow-xl" draggingClassName="opacity-0" disableHover />;
}

function InnerDemo({ useCase, testSettings = {} }) {
  const [items, setItems] = useState(initialTasks);
  const [tiles, setTiles] = useState(initialTiles);
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));
  const [{ isListOver }, dropListZone] = useDrop({ accept: CARD, collect: (monitor) => ({ isListOver: monitor.isOver() }) });

  useEffect(() => {
    if (useCase === 'grid') setTiles(createTileItems(testSettings.itemCount || 6));
    if (useCase === 'sortable') setItems(createTaskItems(testSettings.itemCount || 4));
  }, [useCase, testSettings.itemCount]);

  useEffect(() => {
    if (useCase === 'kanban') setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [useCase, testSettings.cardsPerColumn]);

  const activeItems = useCase === 'grid' ? tiles : items;
  const setActiveItems = useCase === 'grid' ? setTiles : setItems;
  const moveItem = (from, to) => setActiveItems((current) => reorder(current, from, to));
  const moveColumn = (from, to) => setColumnOrder((current) => reorder(current, from, to));
  const moveCardToColumn = (fromColumn, toColumn, cardId) => setColumns((current) => {
    if (fromColumn === toColumn) return current;
    const moving = current[fromColumn].find((card) => card.id === cardId);
    if (!moving) return current;
    return {
      ...current,
      [fromColumn]: current[fromColumn].filter((card) => card.id !== cardId),
      [toColumn]: [...current[toColumn], moving]
    };
  });
  const moveCardToColumnAt = (fromColumn, toColumn, cardId, targetIndex) => setColumns((current) => {
    if (fromColumn === toColumn) return current;
    const moving = current[fromColumn].find((card) => card.id === cardId);
    if (!moving) return current;
    const targetCards = current[toColumn];
    const insertIndex = targetIndex < 0 ? targetCards.length : Math.min(targetIndex, targetCards.length);
    return {
      ...current,
      [fromColumn]: current[fromColumn].filter((card) => card.id !== cardId),
      [toColumn]: [...targetCards.slice(0, insertIndex), moving, ...targetCards.slice(insertIndex)]
    };
  });

  if (useCase === 'canvas') return <Canvas testSettings={testSettings} />;
  if (useCase === 'kanban') return <><CapabilityNote>react-dnd can power Kanban well, but it requires more custom wiring than list-first tools.</CapabilityNote><div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">{columnOrder.map((columnId, index) => <DragColumn key={columnId} columnId={columnId} index={index} cards={columns[columnId]} moveColumn={moveColumn} setColumns={setColumns} moveCardToColumn={moveCardToColumn} moveCardToColumnAt={moveCardToColumnAt} />)}</div></>;

  return <DropZone dropRef={dropListZone} isOver={isListOver} variant={useCase === 'grid' ? 'grid' : 'list'}>{activeItems.map((item, index) => <DragCard key={item.id} item={item} index={index} columnId="list" moveItem={moveItem} />)}</DropZone>;
}

export default function ReactDndDemo({ useCase, testSettings }) {
  return <DndProvider backend={HTML5Backend}><InnerDemo useCase={useCase} testSettings={testSettings} /><ReactDndDragPreview /></DndProvider>;
}