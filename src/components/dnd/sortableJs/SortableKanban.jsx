import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { createColumns, initialColumns } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import DragItemCard from '../shared/DragItemCard';

// Each column is its own ReactSortable sharing the "kanban" group, so the wrapper
// handles both in-column reordering and cross-column moves and keeps state in sync.
function KanbanColumn({ columnId, cards, setColumns }) {
  return (
    <KanbanColumnShell title={columnId}>
      <ReactSortable
        list={cards}
        setList={(newCards) => setColumns((current) => ({ ...current, [columnId]: newCards }))}
        group="kanban"
        animation={180}
        ghostClass="sortable-ghost-empty"
        forceFallback
        fallbackClass="sortable-fallback-solid"
        className="flex min-h-52 flex-col gap-3 rounded-2xl"
      >
        {cards.map((card) => (
          <div key={card.id} className="cursor-grab active:cursor-grabbing">
            <DragItemCard title={card.title} isDragging={false} />
          </div>
        ))}
      </ReactSortable>
    </KanbanColumnShell>
  );
}

export default function SortableKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [testSettings.cardsPerColumn]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
      {Object.keys(columns).map((columnId) => (
        <KanbanColumn key={columnId} columnId={columnId} cards={columns[columnId]} setColumns={setColumns} />
      ))}
    </div>
  );
}