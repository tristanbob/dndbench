import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const TEST_CONTROLS = {
  sortable: {
    title: 'Sortable list settings',
    description: 'Change list length to feel reorder stability under different loads.',
    controls: [{ key: 'itemCount', label: 'Number of items', min: 3, max: 250 }]
  },
  kanban: {
    title: 'Kanban settings',
    description: 'Adjust card volume in each column to compare cross-column movement.',
    controls: [{ key: 'cardsPerColumn', label: 'Cards per column', min: 1, max: 100 }]
  },
  grid: {
    title: 'Grid settings',
    description: 'Change tile count to test spatial reordering in tighter layouts.',
    controls: [{ key: 'itemCount', label: 'Number of tiles', min: 4, max: 250 }]
  },
  canvas: {
    title: 'Canvas settings',
    description: 'Add or remove blocks to test free-form coordinate control.',
    controls: [{ key: 'blockCount', label: 'Number of blocks', min: 2, max: 80 }]
  },
  file: {
    title: 'File drop settings',
    description: 'Resize the target to compare how obvious native drop zones feel.',
    controls: [{ key: 'dropZoneSize', label: 'Drop zone size', options: ['compact', 'large'] }]
  },
  nested: {
    title: 'Nested drag settings',
    description: 'Change item volume to feel how hierarchy-like interactions scale.',
    controls: [{ key: 'itemCount', label: 'Number of items', min: 3, max: 250 }]
  }
};

export default function TestSettingsPanel({ selectedUseCase, value, onChange }) {
  const config = TEST_CONTROLS[selectedUseCase];
  if (!config) return null;

  return (
    <section className="rounded-2xl border border-dashed bg-muted/30 p-3">
      <div className="mb-3 flex items-center gap-2">
        <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">{config.description}</p>
      </div>
      <div className="space-y-3">
        {config.controls.map((control) => (
          <label key={control.key} className="block">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium">
              <span>{control.label}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">{value?.[control.key]}</span>
            </div>
            {control.options ? (
              <div className="flex gap-2">
                {control.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onChange(control.key, option)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-xs font-medium capitalize transition-all ${value?.[control.key] === option ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card hover:bg-muted'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="range"
                min={control.min}
                max={control.max}
                value={value?.[control.key]}
                onChange={(event) => onChange(control.key, Number(event.target.value))}
                className="w-full accent-primary"
              />
            )}
          </label>
        ))}
      </div>
    </section>
  );
}