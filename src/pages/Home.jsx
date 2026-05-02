import React, { useState } from 'react';
import CompactMatrix from '@/components/dnd/CompactMatrix';
import DemoSwitcher from '@/components/dnd/DemoSwitcher';
import FrameworkPanel from '@/components/dnd/FrameworkPanel';
import PlaygroundFrame from '@/components/dnd/PlaygroundFrame';
import SettingsPanel from '@/components/dnd/SettingsPanel';
import TestDefinitionCard from '@/components/dnd/TestDefinitionCard';
import TestPanel from '@/components/dnd/TestPanel';
import WorkbenchHeader from '@/components/dnd/WorkbenchHeader';

export default function Home() {
  const [selectedLibrary, setSelectedLibrary] = useState('hello-pangea');
  const [selectedUseCase, setSelectedUseCase] = useState('sortable');
  const [settings, setSettings] = useState({
    showMatrix: true,
    showGuidance: true,
    debugGrid: false,
    compactMode: false
  });

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <main className="h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_32%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary))_0,transparent_28%)]" />
      <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-3 p-3 md:p-4">
        <WorkbenchHeader selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} />

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 xl:grid-cols-[320px_320px_minmax(0,1fr)]">
          <div className="grid min-h-0 gap-3 overflow-auto lg:grid-cols-2 xl:grid-cols-1">
            <FrameworkPanel selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} onSelect={setSelectedLibrary} />
            <SettingsPanel settings={settings} onToggle={toggleSetting} />
          </div>

          <div className="grid min-h-0 gap-3 overflow-auto lg:grid-cols-2 xl:grid-cols-1">
            <TestPanel selectedUseCase={selectedUseCase} onSelect={setSelectedUseCase} />
            {settings.showGuidance && <TestDefinitionCard selectedUseCase={selectedUseCase} />}
            {settings.showMatrix && <CompactMatrix selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} />}
          </div>

          <div className="min-h-0">
            <PlaygroundFrame selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} settings={settings}>
              <DemoSwitcher selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} />
            </PlaygroundFrame>
          </div>
        </div>
      </div>
    </main>
  );
}