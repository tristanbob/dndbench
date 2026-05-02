import React, { useState } from 'react';
import ControlSidebar from '@/components/dnd/ControlSidebar';
import DemoSwitcher from '@/components/dnd/DemoSwitcher';
import PlaygroundFrame from '@/components/dnd/PlaygroundFrame';


export default function Home() {
  const [selectedLibrary, setSelectedLibrary] = useState('hello-pangea');
  const [selectedUseCase, setSelectedUseCase] = useState('sortable');
  const [settings, setSettings] = useState({
    debugGrid: false,
    compactMode: false,
    restrictToContainer: false,
    axisLock: false,
    dragHandle: false,
    collisionDetection: false,
    keyboardDrag: false,
    nativeFileDrop: false
  });

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,hsl(var(--accent))_0,transparent_32%),radial-gradient(circle_at_85%_10%,hsl(var(--secondary))_0,transparent_28%)]" />
      <header className="flex h-16 shrink-0 items-center border-b bg-card/95 px-5 shadow-sm">
        <h1 className="text-lg font-semibold tracking-tight">DnD Library Showdown</h1>
      </header>
      <div className="flex min-h-0 flex-1">
        <ControlSidebar
          selectedLibrary={selectedLibrary}
          selectedUseCase={selectedUseCase}
          settings={settings}
          onSelectLibrary={setSelectedLibrary}
          onSelectUseCase={setSelectedUseCase}
          onToggleSetting={toggleSetting}
        />

        <section className="min-w-0 flex-1 overflow-hidden p-3 md:p-4">
          <PlaygroundFrame selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} settings={settings}>
            <DemoSwitcher selectedLibrary={selectedLibrary} selectedUseCase={selectedUseCase} />
          </PlaygroundFrame>
        </section>
      </div>
    </main>
  );
}