import React from 'react';
import DragHandle from './DragHandle';

export default function KanbanColumnShell({
  title,
  children,
  isDragging = false,
  rootRef,
  rootProps = {},
  handleRef,
  handleProps = {},
  showHandle = false,
  style,
  className = ''
}) {
  return (
    <div
      ref={rootRef}
      style={style}
      {...rootProps}
      className={`kanban-column-shell min-h-72 rounded-3xl border bg-background/70 p-4 transition-[background-color,border-color,box-shadow,opacity,transform] duration-200 ease-out ${isDragging ? 'opacity-60 ring-2 ring-primary/20' : ''} ${className}`}
    >
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold capitalize tracking-tight">{title}</p>
        {showHandle && <DragHandle refProp={handleRef} dragProps={handleProps} />}
      </div>
      {children}
    </div>
  );
}