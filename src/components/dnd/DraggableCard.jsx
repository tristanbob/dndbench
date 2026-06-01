import React from 'react';
import DragItemCard from './shared/DragItemCard';

export default function DraggableCard({ title, meta, isDragging, listeners, attributes, refProp, style, handleOnly, className = '', disableHover = false }) {
  const rootListeners = handleOnly ? {} : listeners;
  const handleListeners = handleOnly ? listeners : {};

  return (
    <DragItemCard
      title={title}
      meta={meta}
      isDragging={isDragging}
      rootRef={refProp}
      rootProps={{ ...attributes, ...rootListeners }}
      handleProps={handleListeners}
      showHandle={handleOnly}
      disableHover={disableHover}
      style={style}
      className={`${isDragging ? 'relative z-50 opacity-100' : ''} ${className}`}
    />
  );
}