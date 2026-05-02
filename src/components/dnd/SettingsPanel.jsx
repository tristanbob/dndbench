import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const controls = [
  { key: 'showMatrix', label: 'Show matrix', description: 'Keep comparison scores visible' },
  { key: 'showGuidance', label: 'Show guidance', description: 'Display test definition and metric' },
  { key: 'debugGrid', label: 'Debug grid', description: 'Overlay structure lines in the test area' },
  { key: 'compactMode', label: 'Compact mode', description: 'Reduce spacing inside the workbench' }
];

export default function SettingsPanel({ settings, onToggle }) {
  return (
    <section className="rounded-[2rem] border bg-card/85 p-4 shadow-sm min-h-0">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-muted p-2"><SlidersHorizontal className="h-4 w-4" /></div>
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Step 3</p>
          <h2 className="text-lg font-semibold tracking-tight">Settings</h2>
        </div>
      </div>
      <div className="space-y-2">
        {controls.map((control) => {
          const enabled = settings[control.key];
          return (
            <button
              key={control.key}
              onClick={() => onToggle(control.key)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl border bg-background/70 p-3 text-left transition-colors hover:bg-muted"
            >
              <div>
                <p className="text-sm font-medium">{control.label}</p>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{control.description}</p>
              </div>
              <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${enabled ? 'bg-primary' : 'bg-border'}`}>
                <span className={`absolute top-1 h-4 w-4 rounded-full bg-background transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}