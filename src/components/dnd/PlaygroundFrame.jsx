import React from 'react';
import { libraries } from '@/data/dndComparison';

export default function PlaygroundFrame({ selectedLibrary, selectedUseCase, children }) {
  const library = libraries.find((item) => item.id === selectedLibrary);

  return (
    <section className="relative min-h-0 overflow-hidden rounded-[2rem] border bg-card/90 p-4 shadow-2xl shadow-primary/5 md:p-5">
      <div className="relative z-10 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Test area</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">{library.name}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{selectedUseCase}</span>

        </div>
      </div>
      <div className="relative z-10 min-h-0 overflow-auto rounded-[1.5rem]">
        {children}
      </div>
    </section>
  );
}