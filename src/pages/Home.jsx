import React, { useState, useEffect } from 'react';
import ControlSidebar from '@/components/dnd/ControlSidebar';
import TestSelector from '@/components/dnd/TestSelector';
import TestSettingsPanel from '@/components/dnd/TestSettingsPanel';
import PaneSelector from '@/components/dnd/PaneSelector.jsx';
import MultiPaneFrame from '@/components/dnd/MultiPaneFrame.jsx';
import StepBadge from '@/components/dnd/StepBadge';
import { Link } from 'react-router-dom';
import { HelpCircle, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'dndbench:preferences';

const DEFAULTS = {
  selectedLibraries: ['hello-pangea', 'dnd-kit'],
  selectedUseCase: 'sortable',
  testSettings: {
    sortable: { itemCount: 4 },
    kanban: { cardsPerColumn: 2 },
    grid: { itemCount: 6 },
    canvas: { blockCount: 3 }
  }
};

function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return DEFAULTS;
    return {
      selectedLibraries: saved.selectedLibraries ?? DEFAULTS.selectedLibraries,
      selectedUseCase: saved.selectedUseCase ?? DEFAULTS.selectedUseCase,
      testSettings: { ...DEFAULTS.testSettings, ...(saved.testSettings ?? {}) }
    };
  } catch {
    return DEFAULTS;
  }
}

export default function Home() {
  const [prefs] = useState(loadPreferences);
  const [selectedLibraries, setSelectedLibraries] = useState(prefs.selectedLibraries);
  const [selectedUseCase, setSelectedUseCase] = useState(prefs.selectedUseCase);
  const [testSettings, setTestSettings] = useState(prefs.testSettings);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selectedLibraries, selectedUseCase, testSettings })
    );
  }, [selectedLibraries, selectedUseCase, testSettings]);

  const toggleLibrary = (id) => {
    setSelectedLibraries((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const updateTestSetting = (key, value) => {
    setTestSettings((current) => ({
      ...current,
      [selectedUseCase]: { ...current[selectedUseCase], [key]: value }
    }));
  };

  const resetToDefaults = () => {
    setSelectedLibraries(DEFAULTS.selectedLibraries);
    setSelectedUseCase(DEFAULTS.selectedUseCase);
    setTestSettings(DEFAULTS.testSettings);
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_32%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary))_0,transparent_28%)]" />
      <header className="relative flex h-16 shrink-0 items-center justify-between border-b bg-card/95 px-3 shadow-sm sm:h-20 sm:px-5">
        <div className="flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open test menu">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] overflow-auto p-4">
              <TestSelector
                selectedUseCase={selectedUseCase}
                onSelectUseCase={(id) => { setSelectedUseCase(id); }}
              >
                <TestSettingsPanel
                  selectedUseCase={selectedUseCase}
                  value={testSettings[selectedUseCase]}
                  onChange={updateTestSetting}
                />
              </TestSelector>
            </SheetContent>
          </Sheet>
          <button
            type="button"
            onClick={resetToDefaults}
            className="flex items-center gap-3 rounded-xl text-left transition-opacity hover:opacity-80"
          >
            <img
              src="https://media.base44.com/images/public/69f6350ad63057c3e7da530d/77932b09e_generated_image.png"
              alt="dndbench logo"
              className="h-9 w-9 rounded-xl shadow-sm sm:h-10 sm:w-10"
            />
            <div>
              <h1 className="text-base font-semibold tracking-tight sm:text-lg">dndbench</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">Compare React drag-and-drop libraries</p>
            </div>
          </button>
        </div>
        <Link
          to="/faq"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-4"
        >
          <HelpCircle className="h-4 w-4" />
          <span className="hidden sm:inline">FAQ</span>
        </Link>
      </header>
      <div className="shrink-0 space-y-2 border-b bg-card/60 px-3 py-3 sm:px-5">
        <div className="px-1">
          <StepBadge number={1} label="Pick your frameworks" />
        </div>
        <PaneSelector selectedLibraries={selectedLibraries} onToggleLibrary={toggleLibrary} />
      </div>
      <div className="flex min-h-0 flex-1">
        <ControlSidebar
          selectedUseCase={selectedUseCase}
          onSelectUseCase={setSelectedUseCase}
        >
          <TestSettingsPanel
            selectedUseCase={selectedUseCase}
            value={testSettings[selectedUseCase]}
            onChange={updateTestSetting}
          />
        </ControlSidebar>

        <section className="min-w-0 flex-1 overflow-y-auto p-3 md:p-4">
          <div className="mb-3 px-1">
            <StepBadge number={3} label="Use the playground" />
          </div>
          <MultiPaneFrame
            selectedLibraries={selectedLibraries}
            selectedUseCase={selectedUseCase}
            testSettings={testSettings[selectedUseCase]}
          />
        </section>
      </div>
    </main>
  );
}