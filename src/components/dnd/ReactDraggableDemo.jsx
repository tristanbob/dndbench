import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { createCanvasBlocks, createColumns, createTaskItems, createTileItems, initialColumns, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import CapabilityNote from './CapabilityNote';
import DragItemCard from './shared/DragItemCard';
import CanvasSurface from './shared/CanvasSurface';
import KanbanColumnShell from './shared/KanbanColumnShell';
import DropZone from './shared/DropZone';

// react-draggable is purely position-based. To emulate list reordering, each item snaps
// back to its slot (position={{x:0,y:0}}) and we compute a new index from the drag distance.
function ReorderItem({ item, index, count, axis, onReorder, slotSize }) {
  const nodeRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleStop = (_, data) => {
    setDragging(false);
    const delta = axis === 'x' ? data.x : data.y;
    const shift = Math.round(delta / slotSize);
    if (!shift) return;
    const target = Math.max(0, Math.min(count - 1, index + shift));
    if (target !== index) onReorder(index, target);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      axis={axis}
      position={{ x: 0, y: 0 }}
      onStart={() => setDragging(true)}
      onStop={handleStop}
    >
      <div ref={nodeRef} className={`cursor-grab active:cursor-grabbing ${dragging ? 'relative z-50' : ''}`}>
        <DragItemCard title={item.title} meta={item.meta} isDragging={dragging} draggingClassName="scale-[1.03] shadow-2xl ring-2 ring-primary/20" />
      </div>
    </Draggable>
  );
}

function CanvasBlock({ block, restrictToContainer, axisLock }) {
  const nodeRef = useRef(null);
  return (
    <Draggable
      nodeRef={nodeRef}
      bounds={restrictToContainer ? 'parent' : false}
      axis={axisLock && axisLock !== 'none' ? axisLock : 'both'}
      defaultPosition={{ x: block.x, y: block.y }}
    >
      <div ref={nodeRef} className="absolute cursor-grab active:cursor-grabbing">
        <DragItemCard title={block.title} isDragging={false} className="bg-card px-5 py-4 shadow-xl" disableHover />
      </div>
    </Draggable>
  );
}

export default function ReactDraggableDemo({ useCase, testSettings = {} }) {
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
    const restrictToContainer = !!testSettings.restrictToContainer;
    const axisLock = testSettings.axisLock || 'none';
    return (
      <CanvasSurface>
        {blocks.map((block) => (
          <CanvasBlock
            key={`${block.id}-${restrictToContainer}-${axisLock}`}
            block={block}
            restrictToContainer={restrictToContainer}
            axisLock={axisLock}
          />
        ))}
      </CanvasSurface>
    );
  }

  if (useCase === 'kanban') {
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

  const activeItems = useCase === 'grid' ? tiles : items;
  const setActiveItems = useCase === 'grid' ? setTiles : setItems;
  const axis = useCase === 'grid' ? 'x' : 'y';
  const slotSize = useCase === 'grid' ? 130 : 68;

  return (
    <DropZone variant={useCase === 'grid' ? 'grid' : 'list'}>
      {activeItems.map((item, index) => (
        <ReorderItem
          key={item.id}
          item={item}
          index={index}
          count={activeItems.length}
          axis={axis}
          slotSize={slotSize}
          onReorder={(from, to) => setActiveItems((current) => reorder(current, from, to))}
        />
      ))}
    </DropZone>
  );
}