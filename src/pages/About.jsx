import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GitHubLink from '@/components/GitHubLink';
import NpmTrendsLink from '@/components/NpmTrendsLink';

export default function About() {
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
          <h1 className="text-lg font-semibold tracking-tight">About</h1>
          <div className="ml-auto flex items-center gap-1">
            <NpmTrendsLink />
            <GitHubLink />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-bold tracking-tight">About dndbench</h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            dndbench is an open-source playground for comparing JavaScript and React
            drag-and-drop libraries side by side. Choosing a drag-and-drop library is
            surprisingly hard: documentation and isolated demos rarely let you test the
            exact interaction you need, so teams often pick a library and only discover
            its rough edges deep into a project. dndbench fixes that by rendering the same
            scenario — a sortable list, a multi-column Kanban board, a 2D grid, or a
            free-form canvas — across multiple libraries at once, using identical test
            data and settings. Because every pane shares the same configuration, any
            difference you feel comes from the library itself rather than an uneven setup.
          </p>
          <p>
            The current lineup includes eight libraries: dnd-kit, @hello-pangea/dnd,
            @atlaskit/pragmatic-drag-and-drop, react-dnd, react-draggable, SortableJS,
            react-grid-layout, and react-rnd. Each one is implemented with its own
            idiomatic API, and a feature matrix documents native support for capabilities
            like axis locking, container restriction, drag handles, sortable lists,
            cross-container moves, and keyboard accessibility.
          </p>
          <p>
            dndbench is built for front-end engineers, product teams, and anyone
            evaluating drag-and-drop interactions before committing to a dependency. It is
            maintained by Tristan Rhodes as a community-driven, MIT-licensed project, and
            contributions — bug fixes, new libraries, or feature-matrix corrections — are
            welcome on GitHub.
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