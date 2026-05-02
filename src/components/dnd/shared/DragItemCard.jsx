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
  draggingClassName = 'scale-[1.03] shadow-2xl ring-2 ring-primary/20'
}) {
  return (
    <div
      ref={rootRef}
      style={style}
      {...rootProps}
      className={`flex items-center justify-between gap-3 rounded-2xl border bg-background p-4 shadow-sm transition-[background-color,border-color,box-shadow,opacity] ${isDragging ? draggingClassName : 'hover:bg-muted/40 hover:ring-2 hover:ring-primary/10 hover:shadow-md'} ${className}`}
    >
      <div>
        <p className="font-medium tracking-tight">{title}</p>
        {meta && <p className="mt-1 text-xs text-muted-foreground">{meta}</p>}
      </div>
      {showHandle && <DragHandle refProp={handleRef} dragProps={handleProps} />}
    </div>
  );
}