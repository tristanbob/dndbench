import React from 'react';
import { Zap } from 'lucide-react';
import { libraries } from '@/data/dndComparison';

const quickStarts = {
  'hello-pangea': { useCase: 'sortable', tagline: 'Sortable list' },
  'dnd-kit': { useCase: 'grid', tagline: 'Sortable grid' },
  'react-dnd': { useCase: 'canvas', tagline: 'Free-form canvas' }
};

export default function QuickStartBar({ selectedLibrary, onQuickStart }) {
  return (
    <div className="mb-3 rounded-2xl border bg-card/80 p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <Zap className="h-4 w-4 text-accent-foreground" />
        <p className="text-sm font-semibold tracking-tight">Quick start</p>
        <p className="text-xs text-muted-foreground">Jump straight into a demo with simple defaults.</p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {libraries.map((library) => {
          const config = quickStarts[library.id];
          const isActive = selectedLibrary === library.id;
          return (
            <button
              key={library.id}
              onClick={() => onQuickStart(library.id, config.useCase)}
              className={`flex flex-col items-start gap-0.5 rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md ${isActive ? 'border-primary/40 bg-muted/60 ring-2 ring-primary/20' : 'bg-background'}`}
            >
              <span className="text-sm font-medium tracking-tight">Try {library.name}</span>
              <span className="text-xs text-muted-foreground">{config.tagline}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}