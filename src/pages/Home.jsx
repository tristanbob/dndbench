import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers3, MousePointer2, Sparkles } from 'lucide-react';
import DemoSwitcher from '@/components/dnd/DemoSwitcher';
import FeatureMatrix from '@/components/dnd/FeatureMatrix';
import LibrarySelector from '@/components/dnd/LibrarySelector';
import PlaygroundFrame from '@/components/dnd/PlaygroundFrame';
import TestDefinitionCard from '@/components/dnd/TestDefinitionCard';
import UseCaseTabs from '@/components/dnd/UseCaseTabs';
import { verdicts } from '@/data/dndComparison';

export default function Home() {
  const [selectedLibrary, setSelectedLibrary] = useState('hello-pangea');
  const [selectedUseCase, setSelectedUseCase] = useState('sortable');

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_34%),radial-gradient(circle_at_80%_10%,hsl(var(--secondary))_0,transparent_30%)]" />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-primary" /> Drag & drop library lab
            </div>
            <h1 className="mt-7 max-w-4xl text-5xl font-semibold tracking-[-0.06em] md:text-7xl">Compare React drag-and-drop libraries by actually using them.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">A refined playground that defines practical tests first, then shows live implementations for @hello-pangea/dnd, dnd-kit, and react-dnd across lists, boards, grids, canvas, files, and nested drag.</p>
          </div>
          <div className="rounded-[2rem] border bg-card/80 p-5 shadow-2xl shadow-primary/5 backdrop-blur">
            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-muted-foreground">Quick verdicts</p>
            <div className="space-y-3">
              {verdicts.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl bg-background p-4">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[['6', 'defined tests', Layers3], ['3', 'popular libraries', MousePointer2], ['1', 'recommended default', ArrowRight]].map(([value, label, Icon]) => (
            <div key={label} className="rounded-[2rem] border bg-card/70 p-5 shadow-sm backdrop-blur">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-5 text-4xl font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <LibrarySelector selectedLibrary={selectedLibrary} onSelect={setSelectedLibrary} />
        <div className="mt-6"><UseCaseTabs selectedUseCase={selectedUseCase} onSelect={setSelectedUseCase} /></div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <TestDefinitionCard selectedUseCase={selectedUseCase} />
          <PlaygroundFrame selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase}>
            <DemoSwitcher selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} />
          </PlaygroundFrame>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <FeatureMatrix />
      </section>
    </main>
  );
}