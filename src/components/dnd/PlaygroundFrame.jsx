import React from 'react';
import { libraries } from '@/data/dndComparison';

export default function PlaygroundFrame({ selectedLibrary, selectedUseCase, children }) {
  const library = libraries.find((item) => item.id === selectedLibrary);

  return (
    <section className="rounded-[2.5rem] border bg-card/90 p-4 md:p-6 shadow-2xl shadow-primary/5">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Live playground</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{library.name}</h2>
        </div>
        <div className="rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">Test: {selectedUseCase}</div>
      </div>
      {children}
    </section>
  );
}