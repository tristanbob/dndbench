import React from 'react';
import { featureSettings, libraries } from '@/data/dndComparison';

function SupportBadges({ feature, selectedLibraries }) {
  const relevant = selectedLibraries.filter((id) => id in feature.support);
  if (relevant.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {relevant.map((id) => {
        const lib = libraries.find((item) => item.id === id);
        const ok = feature.support[id];
        return (
          <span
            key={id}
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${ok ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive line-through'}`}
          >
            {lib?.friendlyName || id}
          </span>
        );
      })}
    </div>
  );
}

export default function FeatureSettingsPanel({ selectedUseCase, selectedLibraries = [], value = {}, onChange }) {
  const features = featureSettings[selectedUseCase];
  if (!features) return null;

  return (
    <div className="mt-4 border-t border-background/15 pt-4">
      <div className="space-y-3">
        {features.map((feature) => (
          <div key={feature.key}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-medium">{feature.label}</p>
              {feature.type === 'options' ? (
                <div className="flex shrink-0 gap-1">
                  {feature.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onChange(feature.key, option)}
                      className={`rounded-lg border px-2 py-1 text-[11px] font-medium uppercase transition-all ${(value[feature.key] ?? feature.default) === option ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  role="switch"
                  aria-checked={!!value[feature.key]}
                  onClick={() => onChange(feature.key, !value[feature.key])}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${value[feature.key] ? 'bg-primary/70' : 'bg-muted'}`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-background shadow transition-transform ${value[feature.key] ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </button>
              )}
            </div>
            <SupportBadges feature={feature} selectedLibraries={selectedLibraries} />
          </div>
        ))}
      </div>
    </div>
  );
}