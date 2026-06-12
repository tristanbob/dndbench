import React from 'react';
import CapabilityNote from './CapabilityNote';
import PangeaList from './helloPangea/PangeaList';
import PangeaKanban from './helloPangea/PangeaKanban';

export default function HelloPangeaDemo({ useCase, testSettings = {} }) {
  if (useCase === 'canvas') {
    return <CapabilityNote>@hello-pangea/dnd is intentionally list-first. This test exposes an important limitation: choose dnd-kit or react-dnd for coordinate-based free-form canvases.</CapabilityNote>;
  }
  if (useCase === 'kanban') return <PangeaKanban testSettings={testSettings} />;
  return <PangeaList key={useCase} useCase={useCase} testSettings={testSettings} />;
}