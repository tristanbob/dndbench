import React from 'react';
import DragItemCard from '../shared/DragItemCard';

export default function PangeaCard({ item, provided, snapshot }) {
  return (
    <DragItemCard
      title={item.title}
      meta={item.meta}
      isDragging={snapshot.isDragging}
      rootRef={provided.innerRef}
      rootProps={{ ...provided.draggableProps, ...provided.dragHandleProps }}
      draggingClassName="rotate-1 scale-[1.03] shadow-2xl ring-2 ring-primary/20"
    />
  );
}