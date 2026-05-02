import React from 'react';

export default function CanvasSurface({ children, surfaceRef, surfaceProps = {}, className = '' }) {
  return (
    <div ref={surfaceRef} {...surfaceProps} className={`relative h-[380px] overflow-hidden rounded-3xl border bg-muted/40 ${className}`}>
      {children}
    </div>
  );
}