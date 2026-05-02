import React from 'react';
import HelloPangeaDemo from './HelloPangeaDemo';
import DndKitDemo from './DndKitDemo';
import ReactDndDemo from './ReactDndDemo';

export default function DemoSwitcher({ selectedLibrary, selectedUseCase, settings, testSettings }) {
  if (selectedLibrary === 'dnd-kit') return <DndKitDemo useCase={selectedUseCase} settings={settings} testSettings={testSettings} />;
  if (selectedLibrary === 'react-dnd') return <ReactDndDemo useCase={selectedUseCase} settings={settings} testSettings={testSettings} />;
  return <HelloPangeaDemo useCase={selectedUseCase} settings={settings} testSettings={testSettings} />;
}