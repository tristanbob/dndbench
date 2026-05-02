import React from 'react';

export default function DropZone({ children, dropRef, dropProps = {}, isOver = false, variant = 'list', className = '' }) {
  const variantClass = variant === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-3' : 'space-y-3';

  return (
    <div
      ref={dropRef}
      {...dropProps}
      className={`${variantClass} rounded-3xl border bg-background/70 p-4 transition-colors ${isOver ? 'bg-muted' : ''} ${className}`}
    >
      {children}
    </div>
  );
}