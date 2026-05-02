import React from 'react';
import { libraries, scores, useCases } from '@/data/dndComparison';

export default function CompactMatrix({ selectedLibrary, selectedUseCase }) {
  return (
    <section className="rounded-[2rem] border bg-card/85 p-4 shadow-sm min-h-0 overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Step 4</p>
          <h2 className="text-lg font-semibold tracking-tight">Score matrix</h2>
        </div>
        <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">1–5</span>
      </div>
      <div className="overflow-auto max-h-[240px] pr-1">
        <div className="grid grid-cols-[1fr_repeat(6,28px)] gap-2 text-xs">
          <div />
          {useCases.map((useCase) => <div key={useCase.id} className="truncate text-center text-muted-foreground" title={useCase.label}>{useCase.label.slice(0, 1)}</div>)}
          {libraries.map((library) => (
            <React.Fragment key={library.id}>
              <div className={`truncate rounded-xl px-2 py-2 font-medium ${selectedLibrary === library.id ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>{library.name}</div>
              {useCases.map((useCase) => (
                <div key={useCase.id} className={`rounded-xl py-2 text-center font-semibold ${selectedUseCase === useCase.id && selectedLibrary === library.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{scores[library.id][useCase.id]}</div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}