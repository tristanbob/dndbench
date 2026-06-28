import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GitHubLink from '@/components/GitHubLink';
import NpmTrendsLink from '@/components/NpmTrendsLink';

export default function Guide() {
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
          <h1 className="text-lg font-semibold tracking-tight">Guide</h1>
          <div className="ml-auto flex items-center gap-1">
            <NpmTrendsLink />
            <GitHubLink />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-bold tracking-tight">How to choose a React drag-and-drop library</h1>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
          <p>
            Picking the right drag-and-drop library is one of the trickiest dependency
            decisions in front-end development. The best choice depends entirely on the
            interaction you are building, the level of accessibility you need, and how much
            custom behavior you are willing to wire up yourself. This guide walks through
            the main categories of libraries and the questions that should drive your
            decision, so you can use dndbench to confirm the feel before you commit.
          </p>

          <h2 className="pt-2 text-lg font-semibold text-foreground">Match the library to the interaction</h2>
          <p>
            Start by naming the pattern you actually need. Sortable lists — reordering items
            in a single column — are the most common, and libraries like @hello-pangea/dnd,
            dnd-kit, and SortableJS handle them with minimal code. Multi-column Kanban boards
            add cross-container movement, where items move between lists while preserving
            order; @hello-pangea/dnd and dnd-kit shine here. Two-dimensional grids and
            dashboards are the home turf of react-grid-layout, which treats layout as
            resizable, draggable tiles. Free-form canvas interactions, where raw x/y
            coordinates matter more than index order, are best served by react-draggable,
            react-rnd, react-dnd, or low-level toolkits like pragmatic-drag-and-drop.
          </p>

          <h2 className="pt-2 text-lg font-semibold text-foreground">Weigh accessibility and control</h2>
          <p>
            If keyboard dragging and screen-reader support matter, prefer libraries that
            ship those features natively rather than bolting them on. dnd-kit and
            @hello-pangea/dnd lead on accessibility, while lighter wrappers like
            react-draggable focus purely on pointer movement. For highly custom product
            surfaces — nested drop rules, custom collision detection, or unusual constraints
            such as axis locking and container restriction — a composable, low-level toolkit
            gives you the most control at the cost of writing more code yourself.
          </p>

          <h2 className="pt-2 text-lg font-semibold text-foreground">Test before you commit</h2>
          <p>
            Documentation can only tell you so much; the feel of a drag interaction is
            something you have to experience. That is exactly what dndbench is for. Select
            the libraries you are considering, choose your use case, and run them side by
            side with identical data. Compare smoothness, ergonomics, and behavior under the
            same constraints, then check the feature matrix to confirm which capabilities are
            native versus custom. With that evidence in hand, you can choose a drag-and-drop
            library with confidence instead of guesswork.
          </p>
        </div>

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