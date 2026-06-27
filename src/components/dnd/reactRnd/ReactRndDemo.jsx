import React from 'react';
import RndList from './RndList';
import RndKanban from './RndKanban';
import RndCanvas from './RndCanvas';

export default function ReactRndDemo({ useCase, testSettings }) {
  if (useCase === 'canvas') return <RndCanvas testSettings={testSettings} />;
  if (useCase === 'kanban') return <RndKanban testSettings={testSettings} />;
  return <RndList useCase={useCase} testSettings={testSettings} />;
}