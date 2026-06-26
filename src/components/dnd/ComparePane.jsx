import React from 'react';
import { libraries } from '@/data/dndComparison';
import DemoSwitcher from './DemoSwitcher';

export default function ComparePane({ libraryId, selectedUseCase, testSettings }) {
  const library = libraries.find((item) => item.id === libraryId);

  return (
    <section className={`flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] border-2 p-3 shadow-xl ${library.accent.pane}`}>
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="flex h-2 w-2 items-center justify-center">
          <span className={`absolute h-2 w-2 animate-ping rounded-full ${library.accent.ping}`} />
          <span className={`h-2 w-2 rounded-full ${library.accent.dot}`} />
        </span>
        <h3 className={`text-sm font-semibold tracking-tight ${library.accent.title}`}>{library.name}</h3>
      </div>
      <div className={`playground-theme h-[28rem] flex-1 overflow-y-auto rounded-[1.25rem] bg-background p-3 text-foreground shadow-inner ${library.accent.playground}`}>
        <DemoSwitcher
          selectedLibrary={libraryId}
          selectedUseCase={selectedUseCase}
          testSettings={testSettings}
        />
      </div>
    </section>
  );
}