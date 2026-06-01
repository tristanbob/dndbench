import React, { useState, useEffect } from 'react';
import ControlSidebar from '@/components/dnd/ControlSidebar';
import TestSettingsPanel from '@/components/dnd/TestSettingsPanel';
import PaneSelector from '@/components/dnd/PaneSelector.jsx';
import MultiPaneFrame from '@/components/dnd/MultiPaneFrame.jsx';

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

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_32%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary))_0,transparent_28%)]" />
      <header className="relative flex h-20 shrink-0 items-center justify-between border-b bg-card/95 px-5 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="https://media.base44.com/images/public/69f6350ad63057c3e7da530d/0be9c2b3d_generated_image.png"
            alt="dndbench logo"
            className="h-10 w-10 rounded-xl shadow-sm"
          />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">dndbench</h1>
            <p className="text-xs text-muted-foreground">Compare React drag-and-drop libraries</p>
          </div>
        </div>
      </header>
      <div className="shrink-0 border-b bg-card/60 px-5 py-3">
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