import React from 'react';
import PragmaticList from './PragmaticList';
import PragmaticKanban from './PragmaticKanban';
import PragmaticCanvas from './PragmaticCanvas';

export default function PragmaticDemo({ useCase, testSettings }) {
  if (useCase === 'canvas') return <PragmaticCanvas testSettings={testSettings} />;
  if (useCase === 'kanban') return <PragmaticKanban testSettings={testSettings} />;
  return <PragmaticList useCase={useCase} testSettings={testSettings} />;
}