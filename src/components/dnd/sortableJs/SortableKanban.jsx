import React, { useEffect, useRef, useState } from 'react';
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
        const fromColumn = evt.from.dataset.column;
        const toColumn = evt.to.dataset.column;
        // Revert SortableJS's DOM move so React stays in sync, then update state.
        const { from, to, item, oldIndex } = evt;
        if (to !== from) {
          from.insertBefore(item, from.children[oldIndex] || null);
        }
        onMove(fromColumn, toColumn, evt.oldIndex, evt.newIndex);
      }
    });
    return () => sortable.destroy();
  }, [onMove]);

  return (
    <KanbanColumnShell title={columnId}>
      <div ref={ref} data-column={columnId} className="min-h-52 space-y-3 rounded-2xl">
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

  useEffect(() => {
    setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [testSettings.cardsPerColumn]);

  const handleMove = (fromColumn, toColumn, oldIndex, newIndex) => {
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
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
      {Object.keys(columns).map((columnId) => (
        <KanbanColumn key={columnId} columnId={columnId} cards={columns[columnId]} onMove={handleMove} />
      ))}
    </div>
  );
}