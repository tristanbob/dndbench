import React from 'react';
import { Github } from 'lucide-react';

// Central place to set the repo URL — update once, applies everywhere.
export const GITHUB_REPO_URL = 'https://github.com/your-org/dndbench';

export default function GitHubLink({ showLabel = false }) {
  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View source on GitHub"
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Github className="h-4 w-4" />
      {showLabel && <span>GitHub</span>}
    </a>
  );
}