import React from 'react';
import DragItemCard from './shared/DragItemCard';

// Thin dnd-kit adapter around the shared DragItemCard: it spreads the sortable/
// draggable node ref, attributes and listeners onto the card root.
export default function DraggableCard({
  title,
  meta,
  isDragging,
  refProp,
  attributes = {},
  listeners = {},
  style,
  className = '',
  disableHover = false
}) {
  return (
    <DragItemCard
      title={title}
      meta={meta}
      isDragging={isDragging}
      rootRef={refProp}
      rootProps={{ ...attributes, ...listeners }}
      style={style}
      className={`cursor-grab active:cursor-grabbing ${className}`}
      disableHover={disableHover}
    />
  );
}