import React from 'react';
import HelloPangeaDemo from './HelloPangeaDemo';
import DndKitDemo from './DndKitDemo';
import ReactDndDemo from './ReactDndDemo';

export default function DemoSwitcher({ selectedLibrary, selectedUseCase, settings }) {
  if (selectedLibrary === 'dnd-kit') return <DndKitDemo useCase={selectedUseCase} settings={settings} />;
  if (selectedLibrary === 'react-dnd') return <ReactDndDemo useCase={selectedUseCase} settings={settings} />;
  return <HelloPangeaDemo useCase={selectedUseCase} settings={settings} />;
}