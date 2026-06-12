import React from 'react';
import DraggableList from './reactDraggable/DraggableList';
import DraggableKanban from './reactDraggable/DraggableKanban';
import DraggableCanvas from './reactDraggable/DraggableCanvas';

export default function ReactDraggableDemo({ useCase, testSettings = {} }) {
  if (useCase === 'canvas') return <DraggableCanvas testSettings={testSettings} />;
  if (useCase === 'kanban') return <DraggableKanban testSettings={testSettings} />;
  return <DraggableList key={useCase} useCase={useCase} testSettings={testSettings} />;
}