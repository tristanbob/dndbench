import React from 'react';
import { Grid2X2, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import DragFeaturesList from '@/components/dnd/DragFeaturesList';
import { useCases } from '@/data/dndComparison';

export default function ControlSidebar({ selectedLibrary, selectedUseCase, settings, onSelectUseCase, onToggleSetting, children }) {
  return (
    <aside className="flex h-full min-h-0 w-[360px] shrink-0 flex-col border-r bg-card/95 shadow-sm">
      <div className="min-h-0 flex-1 space-y-4 overflow-auto p-4">
        <section>
          <div className="mb-2 flex items-center gap-2 px-1">
            <Grid2X2 className="h-3.5 w-3.5 text-muted-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Test</h2>
          </div>
          <div className="space-y-2">
            {useCases.map((useCase) => {
              const active = selectedUseCase === useCase.id;
              return (
                <div
                  key={useCase.id}
                  className={`rounded-2xl border transition-all ${active ? 'bg-foreground text-background border-foreground' : 'bg-background/70 hover:bg-muted border-border'}`}
                >
                  <button
                    onClick={() => onSelectUseCase(useCase.id)}
                    className="w-full p-3 text-left"
                  >
                    <span className="block text-sm font-semibold leading-tight">{useCase.label}</span>
                    <span className={`mt-1 block truncate text-[11px] ${active ? 'text-background/70' : 'text-muted-foreground'}`}>{useCase.metric}</span>
                  </button>
                  {active && children && (
                    <div className="border-t border-background/15 p-3 pt-3">{children}</div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <div className="shrink-0 border-t p-4">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background/70 px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted">
              <SlidersHorizontal className="h-4 w-4" />
              Drag features
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Drag features</SheetTitle>
              <SheetDescription>Greyed out means unsupported by this library.</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <DragFeaturesList
                selectedLibrary={selectedLibrary}
                settings={settings}
                onToggleSetting={onToggleSetting}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </aside>
  );
}