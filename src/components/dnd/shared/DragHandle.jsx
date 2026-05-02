import React from 'react';
import { GripVertical } from 'lucide-react';

export default function DragHandle({ refProp, dragProps = {}, className = '' }) {
  return (
    <span
      ref={refProp}
      role="button"
      tabIndex={0}
      {...dragProps}
      className={`inline-flex rounded-lg p-1 text-muted-foreground hover:bg-muted ${className}`}
    >
      <GripVertical className="h-4 w-4" />
    </span>
  );
}