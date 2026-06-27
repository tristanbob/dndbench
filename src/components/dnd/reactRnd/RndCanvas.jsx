import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { createCanvasBlocks } from '@/utils/dndHelpers';
import CanvasSurface from '../shared/CanvasSurface';
import DragItemCard from '../shared/DragItemCard';

export default function RndCanvas({ testSettings = {} }) {
  const [blocks, setBlocks] = useState(createCanvasBlocks(testSettings.blockCount || 3));
  useEffect(() => setBlocks(createCanvasBlocks(testSettings.blockCount || 3)), [testSettings.blockCount]);
  const axis = testSettings.axisLock && testSettings.axisLock !== 'none' ? testSettings.axisLock : 'both';
  return (
    <CanvasSurface>
      {blocks.map((block) => (
        <Rnd key={block.id} default={{ x: block.x, y: block.y, width: 132, height: 72 }} bounds={testSettings.restrictToContainer ? 'parent' : undefined} dragAxis={axis} minWidth={110} minHeight={60}>
          <DragItemCard title={block.title} meta="Move or resize" disableHover />
        </Rnd>
      ))}
    </CanvasSurface>
  );
}