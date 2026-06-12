import React, { useEffect, useState } from 'react';
import { createColumns, initialColumns, reorder } from '@/utils/dndHelpers';
import CapabilityNote from '../CapabilityNote';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import ReorderItem from './ReorderItem';

export default function DraggableKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [testSettings.cardsPerColumn]);

  return (
    <>
      <CapabilityNote>react-draggable only tracks raw x/y positions, so cross-column moves need custom logic. Here each column reorders independently by drag distance.</CapabilityNote>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
        {Object.keys(columns).map((columnId) => (
          <KanbanColumnShell key={columnId} title={columnId}>
            <div className="min-h-52 space-y-3 rounded-2xl">
              {columns[columnId].map((card, index) => (
                <ReorderItem
                  key={card.id}
                  item={card}
                  index={index}
                  count={columns[columnId].length}
                  axis="y"
                  slotSize={68}
                  restrict={!!testSettings.restrictToContainer}
                  onReorder={(from, to) => setColumns((current) => ({ ...current, [columnId]: reorder(current[columnId], from, to) }))}
                />
              ))}
            </div>
          </KanbanColumnShell>
        ))}
      </div>
    </>
  );
}