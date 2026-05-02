import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function CapabilityNote({ children }) {
  return (
    <div className="mb-4 flex gap-3 rounded-2xl border bg-muted/60 p-4 text-sm text-muted-foreground">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <p className="leading-6">{children}</p>
    </div>
  );
}