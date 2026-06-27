import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { createColumns, initialColumns, reorder } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import DragItemCard from '../shared/DragItemCard';

export default function RndKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);
  useEffect(() => setColumns(createColumns(testSettings.cardsPerColumn || 2)), [testSettings.cardsPerColumn]);
  return (
    <div className="grid grid-cols-1 gap-4 p-1 md:grid-cols-3">
      {Object.keys(columns).map((columnId) => (
        <KanbanColumnShell key={columnId} title={columnId}>
          <div className="relative min-h-72 rounded-2xl">
            {columns[columnId].map((card, index) => (
              <Rnd key={`${card.id}-${index}`} default={{ x: 0, y: index * 82, width: '100%', height: 68 }} bounds="parent" enableResizing={false} onDragStop={(event, data) => setColumns((current) => ({ ...current, [columnId]: reorder(current[columnId], index, Math.max(0, Math.min(current[columnId].length - 1, Math.round(data.y / 82)))) }))}>
                <DragItemCard title={card.title} meta="Reorder in column" disableHover />
              </Rnd>
            ))}
          </div>
        </KanbanColumnShell>
      ))}
    </div>
  );
}