import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Github, MessageSquare } from 'lucide-react';
import GitHubLink, { GITHUB_REPO_URL } from '@/components/GitHubLink';
import NpmTrendsLink from '@/components/NpmTrendsLink';
import SiteFooter from '@/components/SiteFooter';

export default function Contact() {
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
          <h1 className="text-lg font-semibold tracking-tight">Contact</h1>
          <div className="ml-auto flex items-center gap-1">
            <NpmTrendsLink />
            <GitHubLink />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Get in touch</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Have a question, found an inaccuracy in the feature matrix, or want to suggest a
          library to add? Here are the best ways to reach the dndbench project.
        </p>

        <div className="mt-8 space-y-3">
          <a
            href="mailto:hello@dndbench.dev"
            className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:bg-muted"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Mail className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">Email</span>
              <span className="block text-sm text-muted-foreground">hello@dndbench.dev</span>
            </span>
          </a>

          <a
            href={`${GITHUB_REPO_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:bg-muted"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MessageSquare className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">Open an issue</span>
              <span className="block text-sm text-muted-foreground">Report bugs or request a library on GitHub</span>
            </span>
          </a>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:bg-muted"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Github className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold">GitHub</span>
              <span className="block text-sm text-muted-foreground">github.com/tristanbob/dndbench</span>
            </span>
          </a>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}