import React from 'react';
import { libraries } from '@/data/dndComparison';
import DemoSwitcher from './DemoSwitcher';

export default function ComparePane({ libraryId, selectedUseCase, testSettings }) {
  const library = libraries.find((item) => item.id === libraryId);

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] border-2 border-dashed border-sky-300 bg-sky-100 p-3 shadow-xl shadow-sky-200/50">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="flex h-2 w-2 items-center justify-center">
          <span className="absolute h-2 w-2 animate-ping rounded-full bg-sky-500/70" />
          <span className="h-2 w-2 rounded-full bg-sky-500" />
        </span>
        <h3 className="text-sm font-semibold tracking-tight text-sky-900">{library.name}</h3>
      </div>
      <div className="playground-theme min-h-[28rem] flex-1 overflow-auto rounded-[1.25rem] bg-background p-3 text-foreground shadow-inner">
        <DemoSwitcher
          selectedLibrary={libraryId}
          selectedUseCase={selectedUseCase}
          testSettings={testSettings}
        />
      </div>
    </section>
  );
}