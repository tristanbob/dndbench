import React from 'react';
import { Link } from 'react-router-dom';
import { GITHUB_REPO_URL } from '@/components/GitHubLink';

export default function SiteFooter() {
  return (
    <footer className="border-t bg-card/95 px-5 py-4">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        <Link to="/about" className="transition-colors hover:text-foreground">About</Link>
        <Link to="/guide" className="transition-colors hover:text-foreground">Guide</Link>
        <Link to="/features" className="transition-colors hover:text-foreground">Compare Features</Link>
        <Link to="/faq" className="transition-colors hover:text-foreground">FAQ</Link>
        <Link to="/contact" className="transition-colors hover:text-foreground">Contact</Link>
        <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">GitHub</a>
      </div>
    </footer>
  );
}