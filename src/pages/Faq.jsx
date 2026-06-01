import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Accordion } from '@/components/ui/accordion';
import FaqItem from '@/components/faq/FaqItem';

export default function Faq() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_32%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary))_0,transparent_28%)]" />

      <header className="flex h-20 items-center border-b bg-card/95 px-5 shadow-sm">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <img
            src="https://media.base44.com/images/public/69f6350ad63057c3e7da530d/77932b09e_generated_image.png"
            alt="dndbench logo"
            className="h-9 w-9 rounded-xl shadow-sm"
          />
          <h1 className="text-lg font-semibold tracking-tight">FAQ</h1>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">About dndbench</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            dndbench is a hands-on playground for comparing React drag-and-drop
            libraries side by side, so you can pick the right one for your use case
            before writing a line of code.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          <FaqItem value="purpose" question="What is the purpose of this site?">
            Choosing a drag-and-drop library is hard because documentation and demos
            rarely let you test the exact interaction you need. dndbench lets you run
            the same use case (sortable lists, kanban boards, grids, free-form canvas)
            across multiple libraries at once, so you can feel the differences in
            ergonomics, smoothness, and behavior directly in your browser.
          </FaqItem>

          <FaqItem value="libraries" question="Which libraries are compared?">
            The current lineup includes @hello-pangea/dnd, dnd-kit, react-dnd,
            react-draggable, and SortableJS. Each library renders the same scenario
            using its own idiomatic API, so what you see reflects how the library is
            actually meant to be used.
          </FaqItem>

          <FaqItem value="methodology" question="How does the comparison work?">
            You select one or more libraries and a use case from the sidebar. Every
            selected library is rendered in its own pane with identical test data and
            settings (such as item counts or cards per column). Because the panes share
            the same configuration, any difference you notice comes from the library
            itself — not from an uneven setup.
          </FaqItem>

          <FaqItem value="usecases" question="What use cases can I test?">
            Sortable lists (reordering), kanban boards (moving items across columns),
            grids (2D reordering), and free-form canvas (absolute coordinate movement).
            Not every library supports every pattern — when a library can't handle a
            scenario idiomatically, the pane tells you instead of faking it.
          </FaqItem>

          <FaqItem value="fairness" question="Is the comparison fair and unbiased?">
            We aim for fairness by giving every library the same data, the same use
            cases, and an implementation that follows its recommended patterns. The goal
            isn't to crown a winner — it's to surface real trade-offs so you can decide
            what matters most for your project (accessibility, bundle size, flexibility,
            or simplicity).
          </FaqItem>

          <FaqItem value="settings" question="Why do my selections persist?">
            Your selected libraries, use case, and test settings are saved locally in
            your browser, so you can refresh or come back later and continue exactly
            where you left off.
          </FaqItem>

          <FaqItem value="touch" question="Does it work on touch devices?">
            Drag-and-drop behavior varies a lot between mouse and touch input. We
            recommend testing on the same device type your users will use, since touch
            support and feel differ across libraries.
          </FaqItem>
        </Accordion>

        <div className="mt-10 rounded-2xl border bg-card p-5 text-center">
          <p className="text-sm text-muted-foreground">Ready to compare?</p>
          <Link
            to="/"
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Open the comparison
          </Link>
        </div>
      </div>
    </main>
  );
}