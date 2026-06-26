import React from 'react';
import { useCases } from '@/data/dndComparison';
import { hasTestControls } from './TestSettingsPanel';
import StepBadge from './StepBadge';

export default function TestSelector({ selectedUseCase, onSelectUseCase, children, showHeader = true }) {
  return (
    <section>
      {showHeader && (
        <div className="mb-2 px-1">
          <StepBadge number={2} label="Pick a template" />
        </div>
      )}
      <div className="space-y-2">
        {useCases.map((useCase) => {
          const active = selectedUseCase === useCase.id;
          return (
            <div
              key={useCase.id}
              className={`rounded-2xl border transition-all ${active ? 'border-primary/30 bg-primary/10 text-primary shadow-sm ring-1 ring-primary/15' : 'border-border bg-background/70 hover:bg-muted'}`}
            >
              <button
                onClick={() => onSelectUseCase(useCase.id)}
                className="w-full p-3 text-left"
              >
                <span className="block text-sm font-semibold leading-tight">{useCase.label}</span>
              </button>
              {active && children && hasTestControls(useCase.id) && (
                <div className="border-t border-primary/15 p-3 pt-3 text-foreground">{children}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}