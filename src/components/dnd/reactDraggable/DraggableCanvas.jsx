import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { createCanvasBlocks } from '@/utils/dndHelpers';
import CanvasSurface from '../shared/CanvasSurface';
import DragItemCard from '../shared/DragItemCard';

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

export default function DraggableCanvas({ testSettings = {} }) {
  const [blocks, setBlocks] = useState(createCanvasBlocks(testSettings.blockCount || 3));

  useEffect(() => {
    setBlocks(createCanvasBlocks(testSettings.blockCount || 3));
  }, [testSettings.blockCount]);

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