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
              className={`rounded-2xl border transition-all ${active ? 'bg-foreground text-background border-foreground shadow-sm' : 'bg-background/70 hover:bg-muted border-border'}`}
            >
              <button
                onClick={() => onSelectUseCase(useCase.id)}
                className="w-full p-3 text-left"
              >
                <span className="block text-sm font-semibold leading-tight">{useCase.label}</span>
              </button>
              {active && children && hasTestControls(useCase.id) && (
                <div className="border-t border-background/15 p-3 pt-3">{children}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}