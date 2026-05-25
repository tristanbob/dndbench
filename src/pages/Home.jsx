import React, { useState } from 'react';
import ControlSidebar from '@/components/dnd/ControlSidebar';
import DemoSwitcher from '@/components/dnd/DemoSwitcher';
import PlaygroundFrame from '@/components/dnd/PlaygroundFrame';
import TestSettingsPanel from '@/components/dnd/TestSettingsPanel';

const defaultSettings = {
  restrictToContainer: false,
  axisLock: 'none',
  dragHandle: false,
  collisionDetection: false,
  keyboardDrag: true,
  nativeFileDrop: false
};

export default function Home() {
  const [selectedLibrary, setSelectedLibrary] = useState('hello-pangea');
  const [selectedUseCase, setSelectedUseCase] = useState('sortable');
  const [comparisonMode, setComparisonMode] = useState('default');
  const [settings, setSettings] = useState(defaultSettings);
  const [testSettings, setTestSettings] = useState({
    sortable: { itemCount: 4 },
    kanban: { cardsPerColumn: 2 },
    grid: { itemCount: 6 },
    canvas: { blockCount: 3 },
    file: { dropZoneSize: 'large' },
    nested: { itemCount: 4 }
  });

  const toggleSetting = (key, value) => {
    setComparisonMode('configured');
    setSettings((current) => ({ ...current, [key]: value ?? !current[key] }));
  };

  const activeSettings = comparisonMode === 'default' ? defaultSettings : settings;

  const updateTestSetting = (key, value) => {
    setTestSettings((current) => ({
      ...current,
      [selectedUseCase]: { ...current[selectedUseCase], [key]: value }
    }));
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_32%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary))_0,transparent_28%)]" />
      <header className="flex h-16 shrink-0 items-center border-b bg-card/95 px-5 shadow-sm">
        <h1 className="text-lg font-semibold tracking-tight">dndbench</h1>
      </header>
      <div className="flex min-h-0 flex-1">
        <ControlSidebar
          selectedLibrary={selectedLibrary}
          selectedUseCase={selectedUseCase}
          settings={activeSettings}
          comparisonMode={comparisonMode}
          onSelectLibrary={setSelectedLibrary}
          onSelectUseCase={setSelectedUseCase}
          onSelectComparisonMode={setComparisonMode}
          onToggleSetting={toggleSetting}
        />

        <section className="min-w-0 flex-1 overflow-y-auto p-3 md:p-4">
          <TestSettingsPanel
            selectedUseCase={selectedUseCase}
            value={testSettings[selectedUseCase]}
            onChange={updateTestSetting}
          />
          <PlaygroundFrame selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase}>
            <DemoSwitcher
              selectedLibrary={selectedLibrary}
              selectedUseCase={selectedUseCase}
              settings={activeSettings}
              testSettings={testSettings[selectedUseCase]}
            />
          </PlaygroundFrame>
        </section>
      </div>
    </main>
  );
}