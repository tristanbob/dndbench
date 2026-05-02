import React from 'react';
import { GripVertical } from 'lucide-react';

export default function DraggableCard({ title, meta, isDragging, listeners, attributes, refProp, style, handleOnly }) {
  const rootListeners = handleOnly ? {} : listeners;
  const handleListeners = handleOnly ? listeners : {};

  return (
    <div
      ref={refProp}
      style={style}
      {...attributes}
      {...rootListeners}
      className={`flex items-center justify-between gap-4 rounded-2xl border bg-background p-4 shadow-sm transition-[background-color,border-color,box-shadow,opacity] ${isDragging ? 'scale-[1.03] shadow-2xl ring-2 ring-primary/20' : 'hover:bg-muted/40 hover:ring-2 hover:ring-primary/10 hover:shadow-md'}`}
    >
      <div>
        <p className="font-medium tracking-tight">{title}</p>
        {meta && <p className="mt-1 text-xs text-muted-foreground">{meta}</p>}
      </div>
      <button type="button" {...handleListeners} className="rounded-lg p-1 text-muted-foreground hover:bg-muted">
        <GripVertical className="h-4 w-4" />
      </button>
    </div>
  );
}