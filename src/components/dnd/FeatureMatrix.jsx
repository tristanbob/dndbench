import React from 'react';
import { libraries, scores, useCases } from '@/data/dndComparison';

function ScoreDots({ value }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={`h-2.5 w-2.5 rounded-full ${index < value ? 'bg-primary' : 'bg-border'}`} />
      ))}
    </div>
  );
}

export default function FeatureMatrix() {
  return (
    <section className="rounded-[2rem] border bg-card/80 p-4 md:p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Defined tests</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Feature comparison matrix</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">Scores show implementation fit, from 1 to 5, across the exact test scenarios used in the playground.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 bg-card p-4 text-left font-medium text-muted-foreground">Library</th>
              {useCases.map((useCase) => (
                <th key={useCase.id} className="p-4 text-left font-medium text-muted-foreground">{useCase.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {libraries.map((library) => (
              <tr key={library.id} className="group">
                <td className="sticky left-0 bg-card p-4 font-semibold border-t">{library.name}</td>
                {useCases.map((useCase) => (
                  <td key={useCase.id} className="p-4 border-t">
                    <ScoreDots value={scores[library.id][useCase.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}