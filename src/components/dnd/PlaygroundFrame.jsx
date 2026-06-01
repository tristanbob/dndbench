import React from 'react';
import { libraries } from '@/data/dndComparison';

export default function PlaygroundFrame({ selectedLibrary, selectedUseCase, children }) {
  const library = libraries.find((item) => item.id === selectedLibrary);

  return (
    <section className="relative min-h-0 overflow-hidden rounded-[2rem] border-2 border-dashed border-[#023e7d] bg-[#001233] p-4 shadow-2xl shadow-[#001233]/40 md:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,133,250,0.16)_0,transparent_45%),radial-gradient(circle_at_bottom_left,rgba(4,102,200,0.16)_0,transparent_45%)]" />
      <div className="relative z-10 mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 items-center justify-center">
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#0f85fa]/70" />
            <span className="h-2 w-2 rounded-full bg-[#0f85fa]" />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#87c2fd]">Live playground</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">{library.name}</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#0f85fa]/25 px-3 py-1 text-xs font-medium text-[#87c2fd]">{selectedUseCase}</span>
        </div>
      </div>
      <div className="playground-theme relative z-10 min-h-0 overflow-auto rounded-[1.5rem] bg-background p-4 text-foreground shadow-inner">
        {children}
      </div>
    </section>
  );
}