import React from 'react';
import DragHandle from './DragHandle';

export default function DragItemCard({
  title,
  meta,
  isDragging,
  rootRef,
  rootProps = {},
  handleRef,
  handleProps = {},
  showHandle = false,
  style,
  className = '',
  draggingClassName = 'scale-[1.03] shadow-2xl ring-2 ring-primary/20 border-primary/30',
  disableHover = false
}) {
  return (
    <div
      ref={rootRef}
      style={style}
      {...rootProps}
      className={`drag-item-card flex items-center justify-between gap-3 rounded-2xl border-2 border-border bg-card p-4 shadow-md transition-[background-color,border-color,box-shadow,opacity] ${isDragging ? draggingClassName : disableHover ? '' : 'hover:bg-muted/40 hover:ring-2 hover:ring-primary/10 hover:shadow-lg'} ${className}`}
    >
      <div>
        <p className="font-medium tracking-tight">{title}</p>
        {meta && <p className="mt-1 text-xs text-muted-foreground">{meta}</p>}
      </div>
      {showHandle && <DragHandle refProp={handleRef} dragProps={handleProps} />}
    </div>
  );
}