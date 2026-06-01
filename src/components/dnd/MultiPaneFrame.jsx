import React from 'react';
import { LayoutGrid } from 'lucide-react';
import ComparePane from './ComparePane';

export default function MultiPaneFrame({ selectedLibraries, selectedUseCase, testSettings }) {
  if (selectedLibraries.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[2rem] border-2 border-dashed border-border bg-background/60 p-10 text-center">
        <LayoutGrid className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Select two or more libraries above to compare them side by side.</p>
      </div>
    );
  }

  const gridClass = selectedLibraries.length === 1
    ? 'grid-cols-1'
    : selectedLibraries.length === 2
      ? 'grid-cols-1 lg:grid-cols-2'
      : 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3';

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