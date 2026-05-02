import React from 'react';
import { useCases } from '@/data/dndComparison';

export default function TestDefinitionCard({ selectedUseCase }) {
  const test = useCases.find((item) => item.id === selectedUseCase);

  return (
    <div className="rounded-[2rem] border bg-card/80 p-6 shadow-sm">
      <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Current test</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{test.label}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{test.description}</p>
      <div className="mt-5 rounded-2xl bg-muted p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Evaluation metric</p>
        <p className="mt-2 font-medium">{test.metric}</p>
      </div>
    </div>
  );
}