import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp } from 'lucide-react';

const NPM_TRENDS_URL = 'https://tanstack.com/stats/npm?packageGroups=%5B%7B%22label%22%3A%22dnd-kit%22%2C%22packages%22%3A%5B%7B%22name%22%3A%22%40dnd-kit%2Fcore%22%7D%5D%2C%22color%22%3A%22%23eb2f06%22%7D%2C%7B%22label%22%3A%22Pragmatic+DnD%22%2C%22packages%22%3A%5B%7B%22name%22%3A%22%40atlaskit%2Fpragmatic-drag-and-drop%22%7D%5D%2C%22color%22%3A%22%230652dd%22%7D%2C%7B%22label%22%3A%22React+DnD%22%2C%22packages%22%3A%5B%7B%22name%22%3A%22react-dnd%22%7D%5D%2C%22color%22%3A%22%2310ac84%22%7D%2C%7B%22label%22%3A%22SortableJS%22%2C%22packages%22%3A%5B%7B%22name%22%3A%22sortablejs%22%7D%2C%7B%22name%22%3A%22react-sortablejs%22%7D%2C%7B%22name%22%3A%22vuedraggable%22%7D%2C%7B%22name%22%3A%22vue-draggable-next%22%7D%2C%7B%22name%22%3A%22vue-draggable-plus%22%7D%5D%2C%22color%22%3A%22%23f39c12%22%7D%2C%7B%22label%22%3A%22Hello+Pangea+DnD%22%2C%22packages%22%3A%5B%7B%22name%22%3A%22%40hello-pangea%2Fdnd%22%7D%2C%7B%22name%22%3A%22react-beautiful-dnd%22%7D%5D%2C%22color%22%3A%22%238854d0%22%7D%2C%7B%22label%22%3A%22React+Draggable%22%2C%22packages%22%3A%5B%7B%22name%22%3A%22react-draggable%22%7D%5D%2C%22color%22%3A%22%2320bf6b%22%7D%2C%7B%22label%22%3A%22React+Grid+Layout%22%2C%22packages%22%3A%5B%7B%22name%22%3A%22react-grid-layout%22%7D%5D%2C%22color%22%3A%22%23d81b60%22%7D%2C%7B%22label%22%3A%22React+Rnd%22%2C%22packages%22%3A%5B%7B%22name%22%3A%22react-rnd%22%7D%5D%2C%22color%22%3A%22%23a55d35%22%7D%5D&range=1825-days&transform=none&binType=weekly&viewMode=history&chartType=line&barSort=value&bucketOffset=0&playbackIntervalMs=350&playbackLoop=false&playbackPlaying=false&showDataMode=all&normalizeBaseline=true&showBaseline=false&height=400';
import FeatureMatrix from '@/components/dnd/FeatureMatrix';
import GitHubLink from '@/components/GitHubLink';

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
        <div className="ml-auto flex items-center gap-1">
          <a
            href={NPM_TRENDS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">npm trends</span>
          </a>
          <GitHubLink />
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-3 py-6 sm:px-5">
        <FeatureMatrix />
      </div>
    </main>
  );
}