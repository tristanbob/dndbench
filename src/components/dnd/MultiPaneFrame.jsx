import React from 'react';
import { LayoutGrid, ListChecks, MoveLeft } from 'lucide-react';
import ComparePane from './ComparePane';

export default function MultiPaneFrame({ selectedLibraries, selectedUseCase, testSettings }) {
  if (selectedLibraries.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-border bg-background/60 p-10 text-center">
        <div className="flex items-center gap-4">
          <MoveLeft className="h-16 w-24 shrink-0 text-primary" strokeWidth={2.75} />
          <LayoutGrid className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Select one or more libraries to compare them side by side.</p>
      </div>
    );
  }

  if (!selectedUseCase) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-border bg-background/60 p-10 text-center">
        <div className="flex items-center gap-4">
          <MoveLeft className="h-16 w-24 shrink-0 text-primary" strokeWidth={2.75} />
          <ListChecks className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Now pick a template to run across your selected libraries.</p>
      </div>
    );
  }

  const gridClass = selectedLibraries.length === 1
    ? 'grid-cols-1'
    : selectedLibraries.length === 2
      ? 'grid-cols-1 lg:grid-cols-2'
      : selectedLibraries.length === 3
        ? 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3'
        : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className={`grid h-full min-h-0 gap-3 ${gridClass}`}>
      {selectedLibraries.map((libraryId) => (
        <ComparePane
          key={libraryId}
          libraryId={libraryId}
          selectedUseCase={selectedUseCase}
          testSettings={testSettings}
        />
      ))}
    </div>
  );
}