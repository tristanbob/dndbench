import React, { useEffect, useRef, useState } from 'react';
import { DndContext, useDroppable } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { createColumns, initialColumns } from '@/utils/dndHelpers';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import SortableItem from './SortableItem';
import useDndSensors from './useDndSensors';
import makeRestrictToBoundsModifier from './restrictToBounds';

function SortableColumn({ columnId, cards }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: `column-${columnId}` });
  const mergedTransition = ['background-color 200ms ease-out', 'border-color 200ms ease-out', 'box-shadow 200ms ease-out', transition].filter(Boolean).join(', ');
  const { setNodeRef: setDropZoneRef, isOver: isDropZoneOver } = useDroppable({ id: columnId });

  return (
    <KanbanColumnShell
      title={columnId}
      isDragging={isDragging}
      rootRef={setNodeRef}
      rootProps={{ ...attributes, ...listeners }}
      style={{ transform: CSS.Transform.toString(transform), transition: mergedTransition }}
    >
      <SortableContext items={cards.map((card) => card.id)}>
        <div ref={setDropZoneRef} className={`min-h-52 space-y-3 rounded-2xl transition-colors ${isDropZoneOver ? 'bg-muted/60' : ''}`}>
          {cards.map((card) => <SortableItem key={card.id} item={card} />)}
        </div>
      </SortableContext>
    </KanbanColumnShell>
  );
}

export default function DndKitKanban({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));
  const [, setActiveId] = useState(null);
  const boardRef = useRef(null);
  const sensors = useDndSensors();

  useEffect(() => {
    setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [testSettings.cardsPerColumn]);

  const restrict = !!testSettings.restrictToContainer;
  const modifiers = restrict ? [makeRestrictToBoundsModifier(boardRef, restrict)] : [];

  const columnIdOf = (cols, id) => Object.keys(cols).find((key) => cols[key].some((item) => item.id === id));

  // Multi-container pattern: move the card into the hovered column DURING the drag,
  // so the destination column's cards animate out of the way.
  const handleOver = ({ active, over }) => {
    if (!over) return;
    if (String(active.id).startsWith('column-')) return;

    setColumns((current) => {
      const sourceId = columnIdOf(current, active.id);
      const overId = String(over.id);
      const targetId = current[overId] ? overId : columnIdOf(current, overId);
      if (!sourceId || !targetId || sourceId === targetId) return current;

      const moving = current[sourceId].find((item) => item.id === active.id);
      if (!moving) return current;

      const targetCards = current[targetId];
      const overIndex = targetCards.findIndex((item) => item.id === overId);
      const insertIndex = overIndex === -1 ? targetCards.length : overIndex;

      return {
        ...current,
        [sourceId]: current[sourceId].filter((item) => item.id !== active.id),
        [targetId]: [
          ...targetCards.slice(0, insertIndex),
          moving,
          ...targetCards.slice(insertIndex)
        ]
      };
    });
  };

  const handleEnd = ({ active, over }) => {
    setActiveId(null);
    if (!over) return;
    if (String(active.id).startsWith('column-')) {
      const oldIndex = columnOrder.indexOf(String(active.id).replace('column-', ''));
      const newIndex = columnOrder.indexOf(String(over.id).replace('column-', ''));
      if (oldIndex !== -1 && newIndex !== -1) setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
      return;
    }

    // Cross-column moves already happened in handleOver; finalize in-column reorder.
    setColumns((current) => {
      const columnId = columnIdOf(current, active.id);
      if (!columnId) return current;
      const oldIndex = current[columnId].findIndex((item) => item.id === active.id);
      const newIndex = current[columnId].findIndex((item) => item.id === over.id);
      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return current;
      return { ...current, [columnId]: arrayMove(current[columnId], oldIndex, newIndex) };
    });
  };

  return (
    <DndContext sensors={sensors} modifiers={modifiers} onDragStart={({ active }) => setActiveId(active.id)} onDragOver={handleOver} onDragEnd={handleEnd} onDragCancel={() => setActiveId(null)}>
      <SortableContext items={columnOrder.map((columnId) => `column-${columnId}`)} strategy={rectSortingStrategy}>
        <div ref={boardRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">{columnOrder.map((columnId) => <SortableColumn key={columnId} columnId={columnId} cards={columns[columnId]} />)}</div>
      </SortableContext>
    </DndContext>
  );
}