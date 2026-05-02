import React from 'react';
import { libraries } from '@/data/dndComparison';

export default function LibrarySelector({ selectedLibrary, onSelect }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {libraries.map((library) => {
        const active = selectedLibrary === library.id;
        return (
          <button
            key={library.id}
            onClick={() => onSelect(library.id)}
            className={`group text-left rounded-[2rem] border p-5 transition-all duration-300 ${active ? 'bg-foreground text-background border-foreground shadow-2xl shadow-primary/10' : 'bg-card/80 hover:bg-card border-border hover:-translate-y-1'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold tracking-tight">{library.name}</p>
                <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${active ? 'bg-background/15 text-background' : library.tone}`}>
                  {library.badge}
                </p>
              </div>
              <span className={`h-3 w-3 rounded-full transition-transform ${active ? 'bg-background scale-125' : 'bg-border group-hover:bg-primary'}`} />
            </div>
            <p className={`mt-5 text-sm leading-6 ${active ? 'text-background/75' : 'text-muted-foreground'}`}>{library.summary}</p>
          </button>
        );
      })}
    </div>
  );
}