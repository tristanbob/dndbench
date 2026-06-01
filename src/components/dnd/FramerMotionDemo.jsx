import React, { useEffect, useState } from 'react';
import { Reorder, motion } from 'framer-motion';
import { createCanvasBlocks, createColumns, createTaskItems, createTileItems, initialColumns, initialTasks, initialTiles } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import DragItemCard from './shared/DragItemCard';
import CanvasSurface from './shared/CanvasSurface';
import KanbanColumnShell from './shared/KanbanColumnShell';

function ReorderCard({ item }) {
  const [dragging, setDragging] = useState(false);
  return (
    <Reorder.Item
      value={item}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      whileDrag={{ scale: 1.03 }}
      className="list-none"
    >
      <DragItemCard title={item.title} meta={item.meta} isDragging={dragging} />
    </Reorder.Item>
  );
}

function CanvasBlock({ block }) {
  return (
    <motion.div drag dragMomentum={false} initial={{ x: block.x, y: block.y }} whileDrag={{ scale: 1.05 }} className="absolute cursor-grab active:cursor-grabbing">
      <DragItemCard title={block.title} isDragging={false} className="bg-card px-5 py-4 shadow-xl" disableHover />
    </motion.div>
  );
}

export default function FramerMotionDemo({ useCase, testSettings = {} }) {
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

  if (useCase === 'canvas') {
    return <CanvasSurface>{blocks.map((block) => <CanvasBlock key={block.id} block={block} />)}</CanvasSurface>;
  }

  if (useCase === 'kanban') {
    return (
      <>
        <CapabilityNote>Framer Motion reorders within a column natively, but moving cards across columns needs custom wiring — shown here as independent per-column lists.</CapabilityNote>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-1">
          {Object.keys(columns).map((columnId) => (
            <KanbanColumnShell key={columnId} title={columnId}>
              <Reorder.Group axis="y" values={columns[columnId]} onReorder={(next) => setColumns((current) => ({ ...current, [columnId]: next }))} className="min-h-52 space-y-3 rounded-2xl">
                {columns[columnId].map((card) => <ReorderCard key={card.id} item={card} />)}
              </Reorder.Group>
            </KanbanColumnShell>
          ))}
        </div>
      </>
    );
  }

  const activeItems = useCase === 'grid' ? tiles : items;
  const setActiveItems = useCase === 'grid' ? setTiles : setItems;
  const variantClass = useCase === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-3';

  return (
    <Reorder.Group
      axis={useCase === 'grid' ? 'x' : 'y'}
      values={activeItems}
      onReorder={setActiveItems}
      className={`${variantClass} rounded-3xl border bg-background/70 p-4`}
    >
      {activeItems.map((item) => <ReorderCard key={item.id} item={item} />)}
    </Reorder.Group>
  );
}