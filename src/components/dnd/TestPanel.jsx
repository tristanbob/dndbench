import React from 'react';
import { useCases } from '@/data/dndComparison';

export default function TestPanel({ selectedUseCase, onSelect }) {
  return (
    <section className="rounded-[2rem] border bg-card/85 p-4 shadow-sm min-h-0">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Step 2</p>
          <h2 className="text-lg font-semibold tracking-tight">Test suite</h2>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">6 tests</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {useCases.map((useCase) => {
          const active = selectedUseCase === useCase.id;
          return (
            <button
              key={useCase.id}
              onClick={() => onSelect(useCase.id)}
              className={`rounded-2xl border p-3 text-left transition-all ${active ? 'bg-primary text-primary-foreground border-primary shadow-lg' : 'bg-background/70 hover:bg-muted border-border'}`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{useCase.label}</p>
                <span className={`h-2 w-2 rounded-full ${active ? 'bg-primary-foreground' : 'bg-border'}`} />
              </div>
              <p className={`mt-1 line-clamp-2 text-xs leading-5 ${active ? 'text-primary-foreground/75' : 'text-muted-foreground'}`}>{useCase.metric}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}