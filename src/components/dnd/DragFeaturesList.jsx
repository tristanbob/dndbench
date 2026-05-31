import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { dragSettings } from '@/data/dndComparison';

export default function DragFeaturesList({ selectedLibrary, settings, onToggleSetting }) {
  return (
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
              <TooltipContent side="left" className="max-w-64 text-xs">
                {item.description}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}