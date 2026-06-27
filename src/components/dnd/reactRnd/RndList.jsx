import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { createTaskItems, createTileItems, initialTasks, initialTiles, reorder } from '@/utils/dndHelpers';
import DragItemCard from '../shared/DragItemCard';
import CapabilityNote from '../CapabilityNote';

export default function RndList({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);
  useEffect(() => setItems(isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4)), [isGrid, testSettings.itemCount]);

  const itemWidth = isGrid ? 150 : 320;
  const itemHeight = 68;
  const toIndex = (x, y) => isGrid ? Math.max(0, Math.min(items.length - 1, Math.round(y / 96) * 2 + Math.round(x / 170))) : Math.max(0, Math.min(items.length - 1, Math.round(y / 82)));

  return (
    <>
      <CapabilityNote>React Rnd is a move-and-resize primitive, so this template uses its native dragging plus a small custom index calculation for list ordering.</CapabilityNote>
      <div className="relative min-h-[380px] rounded-3xl border bg-background/70 p-4">
      {items.map((item, index) => {
        const x = isGrid ? (index % 2) * 170 : 0;
        const y = isGrid ? Math.floor(index / 2) * 96 : index * 82;
        return (
          <Rnd key={`${item.id}-${index}`} default={{ x, y, width: itemWidth, height: itemHeight }} bounds="parent" enableResizing={false} onDragStop={(event, data) => setItems((current) => reorder(current, index, toIndex(data.x, data.y)))}>
            <DragItemCard title={item.title} meta="Drag to reorder" disableHover />
          </Rnd>
        );
      })}
      </div>
    </>
  );
}