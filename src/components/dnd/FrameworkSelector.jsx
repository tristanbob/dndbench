import React from 'react';
import { libraries } from '@/data/dndComparison';

export default function FrameworkSelector({ selectedLibrary, onSelectLibrary }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl border bg-background/70 p-1.5">
      {libraries.map((library) => {
        const active = selectedLibrary === library.id;
        return (
          <button
            key={library.id}
            onClick={() => onSelectLibrary(library.id)}
            className={`rounded-xl px-6 py-3 text-base font-semibold transition-all ${active ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            {library.friendlyName}
          </button>
        );
      })}
    </div>
  );
}