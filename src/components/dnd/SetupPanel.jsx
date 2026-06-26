import React from 'react';
import PaneSelector from './PaneSelector';
import TestSelector from './TestSelector';

export default function SetupPanel({ selectedLibraries, onToggleLibrary, selectedUseCase, onSelectUseCase, children }) {
  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Frameworks</p>
        <PaneSelector selectedLibraries={selectedLibraries} onToggleLibrary={onToggleLibrary} />
      </section>

      <section className="space-y-2">
        <p className="px-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Template</p>
        <TestSelector selectedUseCase={selectedUseCase} onSelectUseCase={onSelectUseCase} showHeader={false}>
          {children}
        </TestSelector>
      </section>
    </div>
  );
}