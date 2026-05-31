import React from 'react';
import HelloPangeaDemo from './HelloPangeaDemo';
import DndKitDemo from './DndKitDemo';
import ReactDndDemo from './ReactDndDemo';

export default function DemoSwitcher({ selectedLibrary, selectedUseCase, testSettings }) {
  if (selectedLibrary === 'dnd-kit') return <DndKitDemo useCase={selectedUseCase} testSettings={testSettings} />;
  if (selectedLibrary === 'react-dnd') return <ReactDndDemo useCase={selectedUseCase} testSettings={testSettings} />;
  return <HelloPangeaDemo useCase={selectedUseCase} testSettings={testSettings} />;
}