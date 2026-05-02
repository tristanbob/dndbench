import React from 'react';
import { Activity, Boxes, MousePointer2 } from 'lucide-react';
import { libraries, useCases } from '@/data/dndComparison';

export default function WorkbenchHeader({ selectedLibrary, selectedUseCase }) {
  const library = libraries.find((item) => item.id === selectedLibrary);
  const test = useCases.find((item) => item.id === selectedUseCase);

  return (
    <header className="rounded-[2rem] border bg-card/85 p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"><Activity className="h-3.5 w-3.5" /> Drag & drop comparison lab</div>
          <h1 className="mt-3 text-2xl font-semibold tracking-[-0.04em] md:text-4xl">Structured DnD test workbench</h1>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm md:min-w-[420px]">
          <div className="rounded-2xl bg-background p-3"><MousePointer2 className="mb-2 h-4 w-4 text-primary" /><p className="text-muted-foreground">Framework</p><p className="font-semibold">{library.name}</p></div>
          <div className="rounded-2xl bg-background p-3"><Boxes className="mb-2 h-4 w-4 text-primary" /><p className="text-muted-foreground">Active test</p><p className="font-semibold">{test.label}</p></div>
        </div>
      </div>
    </header>
  );
}