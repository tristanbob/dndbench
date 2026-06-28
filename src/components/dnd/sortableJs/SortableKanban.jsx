import React, { useCallback, useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { createColumns, initialColumns, reorder } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import DragItemCard from '../shared/DragItemCard';

function KanbanColumn({ columnId, cards, onMove }) {
  const ref = useRef(null);

  useEffect(() => {
    const sortable = Sortable.create(ref.current, {
      group: 'kanban',
      animation: 180,
      ghostClass: 'sortable-ghost-empty',
      forceFallback: true,
      fallbackClass: 'sortable-fallback-solid',
      onEnd: (evt) => {
        const { from, to, oldIndex, newIndex } = evt;
        onMove(from.dataset.column, to.dataset.column, oldIndex, newIndex);
      }
    });
    return () => sortable.destroy();
  }, [onMove]);

  return (
    <KanbanColumnShell title={columnId}>
      <div ref={ref} data-column={columnId} className="flex min-h-52 flex-col gap-3 rounded-2xl">
        {cards.map((card) => (
          <div key={card.id} className="cursor-grab active:cursor-grabbing">
            <DragItemCard title={card.title} isDragging={false} />
          </div>
        ))}
      </div>
    </KanbanColumnShell>
  );
}

export default function SortableKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);
  // Bumped after every drop so both columns remount fresh from state, instead of
  // React diffing against the DOM nodes SortableJS moved across containers.
  const [version, setVersion] = useState(0);

  useEffect(() => {
    setColumns(createColumns(testSettings.cardsPerColumn || 2));
    setVersion((v) => v + 1);
  }, [testSettings.cardsPerColumn]);

  const handleMove = useCallback((fromColumn, toColumn, oldIndex, newIndex) => {
    setColumns((current) => {
      if (fromColumn === toColumn) {
        return { ...current, [fromColumn]: reorder(current[fromColumn], oldIndex, newIndex) };
      }
      const source = Array.from(current[fromColumn]);
      const [moved] = source.splice(oldIndex, 1);
      if (!moved) return current;
      const target = Array.from(current[toColumn]);
      target.splice(newIndex, 0, moved);
      return { ...current, [fromColumn]: source, [toColumn]: target };
    });
    setVersion((v) => v + 1);
  }, []);

  return (
    <div key={version} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
      {Object.keys(columns).map((columnId) => (
        <KanbanColumn key={columnId} columnId={columnId} cards={columns[columnId]} onMove={handleMove} />
      ))}
    </div>
  );
}