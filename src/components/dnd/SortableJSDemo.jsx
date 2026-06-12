import React from 'react';
import CapabilityNote from './CapabilityNote';
import SortableList from './sortableJs/SortableList';
import SortableKanban from './sortableJs/SortableKanban';

export default function SortableJSDemo({ useCase, testSettings = {} }) {
  if (useCase === 'canvas') {
    return <CapabilityNote>SortableJS is list-first: it reorders items within and across containers, but has no concept of free x/y coordinates. For true canvas placement, choose dnd-kit, react-dnd, or react-draggable.</CapabilityNote>;
  }
  if (useCase === 'kanban') return <SortableKanban testSettings={testSettings} />;
  return <SortableList key={useCase} useCase={useCase} testSettings={testSettings} />;
}