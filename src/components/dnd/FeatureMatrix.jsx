import React from 'react';
import { Check, Minus, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { featureMatrix, libraries } from '@/data/dndComparison';

function SupportCell({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary" title="Native support">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (value === 'partial') {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground" title="Possible with custom code">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive" title="Not supported">
      <X className="h-3.5 w-3.5" />
    </span>
  );
}

export default function FeatureMatrix() {
  return (
    <section className="mt-6 rounded-2xl border bg-card p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-tight">Native feature support</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Which settings each library supports out of the box.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-3 text-left text-xs font-medium text-muted-foreground">Feature</th>
              {libraries.map((lib) => (
                <th key={lib.id} className="px-2 py-2 text-center text-xs font-medium text-muted-foreground">
                  {lib.friendlyName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featureMatrix.map((feature) => (
              <tr key={feature.key} className="border-b last:border-0 hover:bg-muted/40">
                <td className="py-2.5 pr-3">
                  <TooltipProvider delayDuration={200}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help text-xs font-medium underline decoration-dotted underline-offset-2 sm:text-sm">
                          {feature.label}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="max-w-56 text-xs">
                        {feature.description}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </td>
                {libraries.map((lib) => (
                  <td key={lib.id} className="px-2 py-2.5 text-center">
                    <SupportCell value={feature.support[lib.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Check className="h-3 w-3 text-primary" /> Native support</span>
        <span className="inline-flex items-center gap-1.5"><Minus className="h-3 w-3" /> Possible with custom code</span>
        <span className="inline-flex items-center gap-1.5"><X className="h-3 w-3 text-destructive" /> Not supported</span>
      </div>
    </section>
  );
}