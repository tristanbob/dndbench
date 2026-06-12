import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FeatureMatrix from '@/components/dnd/FeatureMatrix';

export default function Features() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_32%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary))_0,transparent_28%)]" />
      <header className="flex h-16 items-center gap-3 border-b bg-card/95 px-3 shadow-sm sm:h-20 sm:px-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back to playground</span>
        </Link>
        <div className="flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69f6350ad63057c3e7da530d/77932b09e_generated_image.png"
            alt="dndbench logo"
            className="h-9 w-9 rounded-xl shadow-sm sm:h-10 sm:w-10"
          />
          <h1 className="text-base font-semibold tracking-tight sm:text-lg">Compare Features</h1>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-5">
        <FeatureMatrix />
      </div>
    </main>
  );
}