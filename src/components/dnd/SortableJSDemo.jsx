import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';
import { createCanvasBlocks, createColumns, createTaskItems, createTileItems, initialColumns, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import DragItemCard from './shared/DragItemCard';
import CanvasSurface from './shared/CanvasSurface';
import KanbanColumnShell from './shared/KanbanColumnShell';
import DropZone from './shared/DropZone';

// SortableJS mutates the DOM directly, so after each drag we read the new order from
// the event indices and push it back into React state (keeping React as source of truth).

function SortableList({ items, setItems, variant }) {
  const ref = useRef(null);

  useEffect(() => {
    const sortable = Sortable.create(ref.current, {
      animation: 180,
      ghostClass: 'opacity-40',
      onEnd: ({ oldIndex, newIndex }) => {
        if (oldIndex === newIndex) return;
        setItems((current) => reorder(current, oldIndex, newIndex));
      }
    });
    return () => sortable.destroy();
  }, [setItems]);

  return (
    <DropZone dropRef={ref} variant={variant}>
      {items.map((item) => (
        <div key={item.id} className="cursor-grab active:cursor-grabbing">
          <DragItemCard title={item.title} meta={item.meta} isDragging={false} />
        </div>
      ))}
    </DropZone>
  );
}

function KanbanColumn({ columnId, cards, onMove }) {
  const ref = useRef(null);

  useEffect(() => {
    const sortable = Sortable.create(ref.current, {
      group: 'kanban',
      animation: 180,
      ghostClass: 'opacity-40',
      onEnd: (evt) => {
        const fromColumn = evt.from.dataset.column;
        const toColumn = evt.to.dataset.column;
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

export default function SortableJSDemo({ useCase, testSettings = {} }) {
  const [items, setItems] = useState(initialTasks);
  const [tiles, setTiles] = useState(initialTiles);
  const [columns, setColumns] = useState(initialColumns);
  const [blocks, setBlocks] = useState(createCanvasBlocks(3));

  useEffect(() => {
    if (useCase === 'grid') setTiles(createTileItems(testSettings.itemCount || 6));
    if (useCase === 'sortable') setItems(createTaskItems(testSettings.itemCount || 4));
  }, [useCase, testSettings.itemCount]);

  useEffect(() => {
    if (useCase === 'kanban') setColumns(createColumns(testSettings.cardsPerColumn || 2));
  }, [useCase, testSettings.cardsPerColumn]);

  useEffect(() => {
    if (useCase === 'canvas') setBlocks(createCanvasBlocks(testSettings.blockCount || 3));
  }, [useCase, testSettings.blockCount]);

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

  if (useCase === 'canvas') {
    return (
      <>
        <CapabilityNote>SortableJS is list-first: it reorders items within and across containers, but has no concept of free x/y coordinates. Blocks below stay fixed — choose dnd-kit or react-draggable for true canvas placement.</CapabilityNote>
        <CanvasSurface>
          {blocks.map((block) => (
            <div key={block.id} className="absolute" style={{ left: block.x, top: block.y }}>
              <DragItemCard title={block.title} isDragging={false} className="bg-card px-5 py-4 shadow-xl" disableHover />
            </div>
          ))}
        </CanvasSurface>
      </>
    );
  }

  if (useCase === 'kanban') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
        {Object.keys(columns).map((columnId) => (
          <KanbanColumn key={columnId} columnId={columnId} cards={columns[columnId]} onMove={handleMove} />
        ))}
      </div>
    );
  }

  if (useCase === 'grid') {
    return <SortableList key="grid" items={tiles} setItems={setTiles} variant="grid" />;
  }

  return <SortableList key="sortable" items={items} setItems={setItems} variant="list" />;
}