import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { createColumns, initialColumns } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import DragItemCard from '../shared/DragItemCard';

// Inner card list — its own "kanban-cards" group, separate from the panel group,
// so dragging a card never triggers a panel drag and vice versa.
function KanbanColumn({ columnId, cards, setColumns }) {
  return (
    <KanbanColumnShell title={columnId}>
      <ReactSortable
        list={cards}
        setList={(newCards) => setColumns((current) => ({ ...current, [columnId]: newCards }))}
        group="kanban-cards"
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
  // Panel order — the whole columns reorder as draggable panels.
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
      group="kanban-panels"
      animation={180}
      ghostClass="sortable-ghost-empty"
      forceFallback
      fallbackClass="sortable-fallback-solid"
      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1"
    >
      {order.map(({ id }) => (
        <div key={id} className="cursor-grab active:cursor-grabbing">
          <KanbanColumn columnId={id} cards={columns[id] || []} setColumns={setColumns} />
        </div>
      ))}
    </ReactSortable>
  );
}