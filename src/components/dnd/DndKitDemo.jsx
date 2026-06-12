import React from 'react';
import DndKitList from './dndKit/DndKitList';
import DndKitKanban from './dndKit/DndKitKanban';
import DndKitCanvas from './dndKit/DndKitCanvas';

export default function DndKitDemo({ useCase, testSettings = {} }) {
  if (useCase === 'canvas') return <DndKitCanvas testSettings={testSettings} />;
  if (useCase === 'kanban') return <DndKitKanban testSettings={testSettings} />;
  return <DndKitList key={useCase} useCase={useCase} testSettings={testSettings} />;
}