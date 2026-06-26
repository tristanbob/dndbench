import React from 'react';
import { Check } from 'lucide-react';
import { libraries } from '@/data/dndComparison';

export default function PaneSelector({ selectedLibraries, onToggleLibrary }) {
  return (
    <div className="grid gap-1.5 rounded-2xl border bg-background/70 p-1.5">
      {libraries.map((library) => {
        const active = selectedLibraries.includes(library.id);
        return (
          <button
            key={library.id}
            onClick={() => onToggleLibrary(library.id)}
            className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all ${active ? 'border border-primary/25 bg-primary/10 text-primary' : 'border border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <span className={`flex h-4 w-4 items-center justify-center rounded-md border ${active ? 'border-primary/40 bg-primary/10' : 'border-muted-foreground/40'}`}>
              {active && <Check className="h-3 w-3" />}
            </span>
            {library.friendlyName}
          </button>
        );
      })}
    </div>
  );
}