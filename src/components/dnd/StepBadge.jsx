import React from 'react';

export default function StepBadge({ number, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
        {number}
      </span>
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    </div>
  );
}