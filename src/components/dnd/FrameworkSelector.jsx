import React from 'react';
import { libraries } from '@/data/dndComparison';

export default function FrameworkSelector({ selectedLibrary, onSelectLibrary }) {
  return (
    <div className="flex items-center gap-1 rounded-2xl border bg-background/70 p-1">
      {libraries.map((library) => {
        const active = selectedLibrary === library.id;
        return (
          <button
            key={library.id}
            onClick={() => onSelectLibrary(library.id)}
            className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-all ${active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            {library.name}
          </button>
        );
      })}
    </div>
  );
}