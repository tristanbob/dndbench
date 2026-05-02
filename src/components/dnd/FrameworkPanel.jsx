import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { libraries, scores } from '@/data/dndComparison';

export default function FrameworkPanel({ selectedLibrary, selectedUseCase, onSelect }) {
  return (
    <section className="rounded-[2rem] border bg-card/85 p-4 shadow-sm min-h-0">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Step 1</p>
          <h2 className="text-lg font-semibold tracking-tight">Framework</h2>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">3 options</span>
      </div>
      <div className="space-y-3">
        {libraries.map((library) => {
          const active = selectedLibrary === library.id;
          const score = scores[library.id][selectedUseCase];
          return (
            <button
              key={library.id}
              onClick={() => onSelect(library.id)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${active ? 'bg-foreground text-background border-foreground shadow-xl' : 'bg-background/70 hover:bg-muted border-border'}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold tracking-tight">{library.name}</p>
                  <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${active ? 'bg-background/15 text-background' : library.tone}`}>{library.badge}</p>
                </div>
                {active && <CheckCircle2 className="h-5 w-5" />}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className={active ? 'text-background/70' : 'text-muted-foreground'}>Fit for selected test</span>
                <span className="font-semibold">{score}/5</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}