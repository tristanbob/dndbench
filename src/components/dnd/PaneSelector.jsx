import React from 'react';
import { Check } from 'lucide-react';
import { libraries } from '@/data/dndComparison';

export default function PaneSelector({ selectedLibraries, onToggleLibrary }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border bg-background/70 p-1.5">
      {libraries.map((library) => {
        const active = selectedLibraries.includes(library.id);
        return (
          <button
            key={library.id}
            onClick={() => onToggleLibrary(library.id)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all sm:px-5 sm:py-2.5 sm:text-sm ${active ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <span className={`flex h-4 w-4 items-center justify-center rounded-md border ${active ? 'border-background bg-background/20' : 'border-muted-foreground/40'}`}>
              {active && <Check className="h-3 w-3" />}
            </span>
            {library.friendlyName}
          </button>
        );
      })}
    </div>
  );
}