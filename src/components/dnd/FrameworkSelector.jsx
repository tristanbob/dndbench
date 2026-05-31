import React from 'react';
import { libraries } from '@/data/dndComparison';

export default function FrameworkSelector({ selectedLibrary, onSelectLibrary }) {
  return (
    <div className="space-y-2">
      {libraries.map((library) => {
        const active = selectedLibrary === library.id;
        return (
          <button
            key={library.id}
            onClick={() => onSelectLibrary(library.id)}
            className={`flex w-full items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left transition-all ${active ? library.accent.active : library.accent.idle}`}
          >
            <span className={`h-3 w-3 shrink-0 rounded-full ${active ? 'bg-white' : library.accent.dot}`} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold leading-tight">{library.name}</span>
              <span className={`mt-0.5 block truncate text-[11px] ${active ? 'text-white/80' : 'opacity-70'}`}>{library.badge}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}