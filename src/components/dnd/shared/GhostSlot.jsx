import React from 'react';

export default function GhostSlot({ className = '', style }) {
  return (
    <div
      style={style}
      className={`rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 ${className}`}
    />
  );
}