import React, { useState } from 'react';
import ControlSidebar from '@/components/dnd/ControlSidebar';
import DemoSwitcher from '@/components/dnd/DemoSwitcher';
import PlaygroundFrame from '@/components/dnd/PlaygroundFrame';
import TestDefinitionCard from '@/components/dnd/TestDefinitionCard';
import WorkbenchHeader from '@/components/dnd/WorkbenchHeader';

export default function Home() {
  const [selectedLibrary, setSelectedLibrary] = useState('hello-pangea');
  const [selectedUseCase, setSelectedUseCase] = useState('sortable');
  const [settings, setSettings] = useState({
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
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 xl:grid-cols-[340px_minmax(0,1fr)]">
          <ControlSidebar
            selectedLibrary={selectedLibrary}
            selectedUseCase={selectedUseCase}
            settings={settings}
            onSelectLibrary={setSelectedLibrary}
            onSelectUseCase={setSelectedUseCase}
            onToggleSetting={toggleSetting}
          />

          <div className="flex min-h-0 flex-col gap-3">
            <WorkbenchHeader selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} />
            {settings.showGuidance && <TestDefinitionCard selectedUseCase={selectedUseCase} />}
            <div className="min-h-0 flex-1">
              <PlaygroundFrame selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} settings={settings}>
                <DemoSwitcher selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} />
              </PlaygroundFrame>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}