import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { createColumns, initialColumns } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import DragItemCard from '../shared/DragItemCard';
import DragHandle from '../shared/DragHandle';

// Each column is its own ReactSortable sharing the "kanban" group, so the wrapper
// handles both in-column reordering and cross-column moves and keeps state in sync.
function KanbanColumn({ columnId, cards, setColumns }) {
  return (
    <KanbanColumnShell
      title={columnId}
      showHandle
      handleProps={{ className: 'panel-drag-handle cursor-grab active:cursor-grabbing' }}
    >
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
  // Track the panel order separately so the whole columns can be reordered as panels.
  const [order, setOrder] = useState(Object.keys(initialColumns).map((id) => ({ id })));

  useEffect(() => {
    const next = createColumns(testSettings.cardsPerColumn || 2);
    setColumns(next);
    setOrder(Object.keys(next).map((id) => ({ id })));
  }, [testSettings.cardsPerColumn]);

  return (
    <ReactSortable
      list={order}
      setList={setOrder}
      handle=".panel-drag-handle"
      animation={180}
      ghostClass="sortable-ghost-empty"
      forceFallback
      fallbackClass="sortable-fallback-solid"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1"
    >
      {order.map(({ id }) => (
        <div key={id}>
          <KanbanColumn columnId={id} cards={columns[id] || []} setColumns={setColumns} />
        </div>
      ))}
    </ReactSortable>
  );
}