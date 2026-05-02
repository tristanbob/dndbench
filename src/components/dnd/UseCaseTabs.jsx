import React from 'react';
import { useCases } from '@/data/dndComparison';

export default function UseCaseTabs({ selectedUseCase, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto rounded-full border bg-card/80 p-2 shadow-sm">
      {useCases.map((useCase) => (
        <button
          key={useCase.id}
          onClick={() => onSelect(useCase.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${selectedUseCase === useCase.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/15' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
        >
          {useCase.label}
        </button>
      ))}
    </div>
  );
}