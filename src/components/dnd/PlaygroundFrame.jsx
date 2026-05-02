import React from 'react';
import { libraries } from '@/data/dndComparison';

export default function PlaygroundFrame({ selectedLibrary, selectedUseCase, settings, children }) {
  const library = libraries.find((item) => item.id === selectedLibrary);

  return (
    <section className={`relative min-h-0 overflow-hidden rounded-[2rem] border bg-card/90 shadow-2xl shadow-primary/5 ${settings?.compactMode ? 'p-3' : 'p-4 md:p-5'}`}>
      {settings?.debugGrid && <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />}
      <div className="relative z-10 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Step 5 · Test area</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">{library.name}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">{selectedUseCase}</span>
          {settings?.debugGrid && <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">debug grid</span>}
          {settings?.compactMode && <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">compact</span>}
        </div>
      </div>
      <div className="relative z-10 min-h-0 overflow-auto rounded-[1.5rem]">
        {children}
      </div>
    </section>
  );
}