import React, { useState } from 'react';
import { Grid2X2, ChevronDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { dragSettings, useCases } from '@/data/dndComparison';

export default function ControlSidebar({ selectedLibrary, selectedUseCase, settings, onSelectUseCase, onToggleSetting, children }) {
  const [dragFeaturesOpen, setDragFeaturesOpen] = useState(false);

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
                <div key={useCase.id}>
                  <button
                    onClick={() => onSelectUseCase(useCase.id)}
                    className={`w-full rounded-2xl border p-3 text-left transition-all ${active ? 'bg-foreground text-background border-foreground' : 'bg-background/70 hover:bg-muted border-border'}`}
                  >
                    <span className="block text-sm font-semibold leading-tight">{useCase.label}</span>
                    <span className={`mt-1 block truncate text-[11px] ${active ? 'text-background/70' : 'text-muted-foreground'}`}>{useCase.metric}</span>
                  </button>
                  {active && children && <div className="mt-2">{children}</div>}
                </div>
              );
            })}
          </div>
        </section>


        <section>
          <button
            onClick={() => setDragFeaturesOpen((open) => !open)}
            className="mb-2 flex w-full items-center justify-between px-1 text-left"
          >
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Drag features</h2>
              <p className="mt-1 text-[11px] text-muted-foreground">Greyed out means unsupported by this library.</p>
            </div>
            <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${dragFeaturesOpen ? 'rotate-180' : ''}`} />
          </button>
          {dragFeaturesOpen && (
          <TooltipProvider delayDuration={150}>
            <div className="space-y-2">
              {dragSettings.map((item) => {
                const supported = item.support[selectedLibrary];
                const isAlwaysOn = item.key === 'keyboardDrag' && supported;
                const active = supported && (item.key === 'axisLock' ? settings.axisLock !== 'none' : (settings[item.key] || isAlwaysOn));
                return (
                  <Tooltip key={item.key}>
                    <TooltipTrigger asChild>
                      <span className="block">
                        <button
                          disabled={!supported || isAlwaysOn}
                          onClick={() => supported && !isAlwaysOn && item.key !== 'axisLock' && onToggleSetting(item.key)}
                          className={`flex w-full items-center justify-between rounded-2xl border px-3 py-2 text-left text-xs font-medium transition-all ${active ? 'bg-primary text-primary-foreground border-primary' : supported ? 'bg-background/70 hover:bg-muted border-border text-foreground' : 'cursor-not-allowed bg-muted/40 border-border text-muted-foreground/45'}`}
                        >
                          <span>{item.label}{isAlwaysOn ? ' · Always on' : ''}</span>
                          {item.key === 'axisLock' && supported ? (
                            <span className="flex gap-1">
                              {['none', 'horizontal', 'vertical'].map((axis) => (
                                <span
                                  key={axis}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    onToggleSetting(item.key, axis);
                                  }}
                                  className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${settings.axisLock === axis ? 'bg-primary-foreground text-primary' : 'bg-background/70 text-muted-foreground'}`}
                                >
                                  {axis}
                                </span>
                              ))}
                            </span>
                          ) : (
                            <span className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-primary-foreground' : supported ? 'bg-border' : 'bg-muted-foreground/30'}`} />
                          )}
                        </button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-64 text-xs">
                      {item.description}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
          )}
        </section>
      </div>
    </aside>
  );
}