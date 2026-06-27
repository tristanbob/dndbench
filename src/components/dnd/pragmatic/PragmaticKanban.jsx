import React, { useEffect, useRef, useState } from 'react';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { createColumns, initialColumns, moveCard } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import DragItemCard from '../shared/DragItemCard';

function Card({ card, columnId, index, onMove }) {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) return undefined;
    return combine(
      draggable({ element: ref.current, getInitialData: () => ({ cardId: card.id, columnId, index }), onDragStart: () => setIsDragging(true), onDrop: () => setIsDragging(false) }),
      dropTargetForElements({ element: ref.current, getData: () => ({ columnId, index }), onDrop: ({ source }) => onMove(source.data, { droppableId: columnId, index }) })
    );
  }, [card.id, columnId, index, onMove]);

  return <DragItemCard rootRef={ref} title={card.title} meta="Drag between columns" isDragging={isDragging} />;
}

function Column({ columnId, cards, onMove }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return undefined;
    return dropTargetForElements({ element: ref.current, getData: () => ({ columnId }), onDrop: ({ source }) => onMove(source.data, { droppableId: columnId, index: cards.length }) });
  }, [cards.length, columnId, onMove]);

  return (
    <KanbanColumnShell title={columnId}>
      <div ref={ref} className="min-h-52 space-y-3 rounded-2xl">
        {cards.map((card, index) => <Card key={card.id} card={card} columnId={columnId} index={index} onMove={onMove} />)}
      </div>
    </KanbanColumnShell>
  );
}

export default function PragmaticKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);
  useEffect(() => setColumns(createColumns(testSettings.cardsPerColumn || 2)), [testSettings.cardsPerColumn]);

  const onMove = (source, destination) => {
    if (!source?.columnId || !destination?.droppableId) return;
    setColumns((current) => moveCard(current, { droppableId: source.columnId, index: source.index }, destination));
  };

  return <div className="grid grid-cols-1 gap-4 p-1 md:grid-cols-3">{Object.keys(columns).map((id) => <Column key={id} columnId={id} cards={columns[id]} onMove={onMove} />)}</div>;
}