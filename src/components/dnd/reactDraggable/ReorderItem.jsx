import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import DragItemCard from '../shared/DragItemCard';

// react-draggable is purely position-based. To emulate list reordering, each item snaps
// back to its slot (position={{x:0,y:0}}) and we compute a new index from the drag distance.
export default function ReorderItem({ item, index, count, axis, onReorder, slotSize, restrict }) {
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
      bounds={restrict ? 'parent' : false}
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