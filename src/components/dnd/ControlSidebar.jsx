import React from 'react';
import { Check, Grid2X2, SlidersHorizontal } from 'lucide-react';
import { libraries, scores, useCases } from '@/data/dndComparison';

const settingItems = [
  { key: 'showGuidance', label: 'Guidance' },
  { key: 'debugGrid', label: 'Grid' },
  { key: 'compactMode', label: 'Compact' }
];

export default function ControlSidebar({ selectedLibrary, selectedUseCase, settings, onSelectLibrary, onSelectUseCase, onToggleSetting }) {
  return (
    <aside className="flex h-screen min-h-0 w-[360px] shrink-0 flex-col border-r bg-card/95 shadow-sm">
      <div className="border-b p-5">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">DnD lab</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight">Controls</h1>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-auto p-4">
        <section>
          <div className="mb-2 flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Framework</h2>
            <span className="text-xs text-muted-foreground">fit</span>
          </div>
          <div className="space-y-2">
            {libraries.map((library) => {
              const active = selectedLibrary === library.id;
              return (
                <button
                  key={library.id}
                  onClick={() => onSelectLibrary(library.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition-all ${active ? 'bg-primary text-primary-foreground border-primary' : 'bg-background/70 hover:bg-muted border-border'}`}
                >
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? 'border-primary-foreground' : 'border-border'}`}>{active && <Check className="h-3 w-3" />}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{library.name}</span>
                    <span className={`block truncate text-[11px] ${active ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{library.badge}</span>
                  </span>
                  <span className="text-sm font-semibold">{scores[library.id][selectedUseCase]}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2 px-1">
            <Grid2X2 className="h-3.5 w-3.5 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Test</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {useCases.map((useCase) => {
              const active = selectedUseCase === useCase.id;
              return (
                <button
                  key={useCase.id}
                  onClick={() => onSelectUseCase(useCase.id)}
                  className={`rounded-2xl border p-3 text-left transition-all ${active ? 'bg-foreground text-background border-foreground' : 'bg-background/70 hover:bg-muted border-border'}`}
                >
                  <span className="block text-sm font-semibold leading-tight">{useCase.label}</span>
                  <span className={`mt-1 block truncate text-[11px] ${active ? 'text-background/70' : 'text-muted-foreground'}`}>{useCase.metric}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2 px-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Settings</h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {settingItems.map((item) => {
              const active = settings[item.key];
              return (
                <button
                  key={item.key}
                  onClick={() => onToggleSetting(item.key)}
                  className={`rounded-2xl border px-3 py-2 text-xs font-medium transition-all ${active ? 'bg-primary text-primary-foreground border-primary' : 'bg-background/70 hover:bg-muted border-border text-muted-foreground'}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
}