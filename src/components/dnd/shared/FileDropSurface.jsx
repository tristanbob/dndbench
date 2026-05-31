import React from 'react';

export default function FileDropSurface({ dropRef, dropProps = {}, isOver = false, title = 'Drop files here', message, active = false }) {
  return (
    <div
      ref={dropRef}
      {...dropProps}
      className={`rounded-3xl border border-dashed p-10 text-center transition-colors md:p-16 ${active ? 'ring-2 ring-primary/10' : ''} ${isOver ? 'bg-muted' : 'bg-background/70'}`}
    >
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}