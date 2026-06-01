import React, { useState } from 'react';
import ControlSidebar from '@/components/dnd/ControlSidebar';
import DemoSwitcher from '@/components/dnd/DemoSwitcher';
import PlaygroundFrame from '@/components/dnd/PlaygroundFrame';
import TestSettingsPanel from '@/components/dnd/TestSettingsPanel';
import FrameworkSelector from '@/components/dnd/FrameworkSelector';

export default function Home() {
  const [selectedLibrary, setSelectedLibrary] = useState('hello-pangea');
  const [selectedUseCase, setSelectedUseCase] = useState('sortable');
  const [testSettings, setTestSettings] = useState({
    sortable: { itemCount: 4 },
    kanban: { cardsPerColumn: 2 },
    grid: { itemCount: 6 },
    canvas: { blockCount: 3 }
  });

  const updateTestSetting = (key, value) => {
    setTestSettings((current) => ({
      ...current,
      [selectedUseCase]: { ...current[selectedUseCase], [key]: value }
    }));
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_32%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary))_0,transparent_28%)]" />
      <header className="relative flex h-20 shrink-0 items-center border-b bg-card/95 px-5 shadow-sm">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">dndbench</h1>
          <p className="text-xs text-muted-foreground">Compare React drag-and-drop libraries</p>
        </div>
      </header>
      <div className="shrink-0 border-b bg-card/60 px-5 py-3">
        <FrameworkSelector selectedLibrary={selectedLibrary} onSelectLibrary={setSelectedLibrary} />
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
          <PlaygroundFrame selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase}>
            <DemoSwitcher
              selectedLibrary={selectedLibrary}
              selectedUseCase={selectedUseCase}
              testSettings={testSettings[selectedUseCase]}
            />
          </PlaygroundFrame>
        </section>
      </div>
    </main>
  );
}