import React from 'react';
import { Square, Columns3 } from 'lucide-react';

const modes = [
  { id: 'single', label: 'Single', icon: Square },
  { id: 'compare', label: 'Compare', icon: Columns3 }
];

export default function ModeToggle({ mode, onChangeMode }) {
  return (
    <div className="flex items-center gap-1 rounded-xl border bg-background/70 p-1">
      {modes.map((item) => {
        const active = mode === item.id;
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => onChangeMode(item.id)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${active ? 'bg-foreground text-background shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}