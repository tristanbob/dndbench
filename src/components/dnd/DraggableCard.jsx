import React from 'react';
import { GripVertical } from 'lucide-react';

export default function DraggableCard({ title, meta, isDragging, listeners, attributes, refProp, style }) {
  return (
    <div
      ref={refProp}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between gap-4 rounded-2xl border bg-background p-4 shadow-sm transition-all ${isDragging ? 'scale-[1.03] shadow-2xl ring-2 ring-primary/20' : 'hover:-translate-y-0.5 hover:shadow-md'}`}
    >
      <div>
        <p className="font-medium tracking-tight">{title}</p>
        {meta && <p className="mt-1 text-xs text-muted-foreground">{meta}</p>}
      </div>
      <GripVertical className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}