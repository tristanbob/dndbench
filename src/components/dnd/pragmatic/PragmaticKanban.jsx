import React, { useEffect, useRef, useState } from 'react';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { createColumns, initialColumns, moveCard, reorder } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import DragItemCard from '../shared/DragItemCard';

function Card({ card, columnId, index, onMove }) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    return combine(
      draggable({ element: ref.current, getInitialData: () => ({ type: 'card', cardId: card.id, columnId, index }), onDragStart: () => setIsDragging(true), onDrop: () => setIsDragging(false) }),
      dropTargetForElements({ element: ref.current, canDrop: ({ source }) => source.data.type === 'card', getData: () => ({ columnId, index }), onDrop: ({ source }) => onMove(source.data, { droppableId: columnId, index }) })
    );
  }, [card.id, columnId, index, onMove]);

  return <DragItemCard rootRef={ref} title={card.title} meta="Drag between columns" isDragging={isDragging} />;
}

function Column({ columnId, index, cards, onMove, onMoveColumn }) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    return combine(
      // The whole panel is draggable to reorder columns...
      draggable({ element: ref.current, getInitialData: () => ({ type: 'column', columnId, index }), onDragStart: () => setIsDragging(true), onDrop: () => setIsDragging(false) }),
      // ...and a drop target for both columns (reorder) and cards (drop into column).
      dropTargetForElements({
        element: ref.current,
        getData: () => ({ columnId, index }),
        onDrop: ({ source }) => {
          if (source.data.type === 'column') onMoveColumn(source.data.index, index);
          else onMove(source.data, { droppableId: columnId, index: cards.length });
        }
      })
    );
  }, [cards.length, columnId, index, onMove, onMoveColumn]);

  return (
    <KanbanColumnShell title={columnId} rootRef={ref} isDragging={isDragging} className="cursor-grab active:cursor-grabbing">
      <div className="min-h-52 space-y-3 rounded-2xl">
        {cards.map((card, cardIndex) => <Card key={card.id} card={card} columnId={columnId} index={cardIndex} onMove={onMove} />)}
      </div>
    </KanbanColumnShell>
  );
}

export default function PragmaticKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));

  useEffect(() => {
    const next = createColumns(testSettings.cardsPerColumn || 2);
    setColumns(next);
    setColumnOrder(Object.keys(next));
  }, [testSettings.cardsPerColumn]);

  const onMove = (source, destination) => {
    if (!source?.columnId || !destination?.droppableId) return;
    setColumns((current) => moveCard(current, { droppableId: source.columnId, index: source.index }, destination));
  };

  const onMoveColumn = (from, to) => {
    if (from === to) return;
    setColumnOrder((current) => reorder(current, from, to));
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-1 md:grid-cols-3">
      {columnOrder.map((id, index) => <Column key={id} columnId={id} index={index} cards={columns[id]} onMove={onMove} onMoveColumn={onMoveColumn} />)}
    </div>
  );
}