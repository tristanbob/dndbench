import React, { useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { createColumns, initialColumns, reorder } from '@/utils/dndHelpers';
import CapabilityNote from '../CapabilityNote';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import DragCard from './DragCard';
import { CARD, COLUMN } from './itemTypes';

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

export default function ReactDndKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));

  useEffect(() => {
    setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [testSettings.cardsPerColumn]);

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

  return (
    <>
      <CapabilityNote>react-dnd can power Kanban well, but it requires more custom wiring than list-first tools.</CapabilityNote>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
        {columnOrder.map((columnId, index) => (
          <DragColumn key={columnId} columnId={columnId} index={index} cards={columns[columnId]} moveColumn={moveColumn} setColumns={setColumns} moveCardToColumn={moveCardToColumn} moveCardToColumnAt={moveCardToColumnAt} />
        ))}
      </div>
    </>
  );
}