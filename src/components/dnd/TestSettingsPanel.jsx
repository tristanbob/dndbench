import React, { useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

const TEST_CONTROLS = {
  sortable: {
    controls: [{ key: 'itemCount', label: 'Items', min: 3, max: 24 }]
  },
  kanban: {
    controls: [{ key: 'cardsPerColumn', label: 'Cards', min: 1, max: 12 }]
  },
  grid: {
    controls: [{ key: 'itemCount', label: 'Tiles', min: 4, max: 36 }]
  },
  canvas: {
    controls: [{ key: 'blockCount', label: 'Blocks', min: 2, max: 16 }]
  }
};

export const hasTestControls = (useCase) => Boolean(TEST_CONTROLS[useCase]);

const clampValue = (nextValue, min, max) => Math.min(max, Math.max(min, nextValue ?? min));

export default function TestSettingsPanel({ selectedUseCase, value, onChange }) {
  const config = TEST_CONTROLS[selectedUseCase];

  useEffect(() => {
    if (!config) return;
    config.controls.forEach((control) => {
      const currentValue = value?.[control.key];
      const clampedValue = clampValue(currentValue, control.min, control.max);
      if (currentValue !== clampedValue) onChange(control.key, clampedValue);
    });
  }, [config, value, onChange]);

  if (!config) return null;

  return (
    <div className="space-y-3">
      {config.controls.map((control) => {
        const currentValue = clampValue(value?.[control.key], control.min, control.max);
        return (
          <label key={control.key} className="block">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs font-medium">
              <span>{control.label}</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">{currentValue}</span>
            </div>
            {control.options ? (
              <div className="flex gap-2">
                {control.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onChange(control.key, option)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-xs font-medium capitalize transition-all ${value?.[control.key] === option ? 'border-background bg-background/20' : 'border-background/25 hover:bg-background/10'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <Slider
                min={control.min}
                max={control.max}
                step={1}
                value={[currentValue]}
                onValueChange={([nextValue]) => onChange(control.key, nextValue)}
              />
            )}
          </label>
        );
      })}
    </div>
  );
}