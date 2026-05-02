export const reorder = (list, startIndex, endIndex) => {
  const next = Array.from(list);
  const [removed] = next.splice(startIndex, 1);
  next.splice(endIndex, 0, removed);
  return next;
};

export const moveCard = (columns, source, destination) => {
  const next = { ...columns };
  const sourceItems = Array.from(next[source.droppableId]);
  const destinationItems = Array.from(next[destination.droppableId]);
  const [removed] = sourceItems.splice(source.index, 1);

  if (source.droppableId === destination.droppableId) {
    sourceItems.splice(destination.index, 0, removed);
    next[source.droppableId] = sourceItems;
  } else {
    destinationItems.splice(destination.index, 0, removed);
    next[source.droppableId] = sourceItems;
    next[destination.droppableId] = destinationItems;
  }

  return next;
};

export const initialTasks = [
  { id: 'audit', title: 'Audit accessibility', meta: 'keyboard + screen reader' },
  { id: 'motion', title: 'Tune motion curves', meta: 'drop animation' },
  { id: 'mobile', title: 'Validate mobile drag', meta: 'touch sensors' },
  { id: 'state', title: 'Stress-test state', meta: 'rapid reorder' }
];

export const initialColumns = {
  backlog: [
    { id: 'brief', title: 'Write scenario brief' },
    { id: 'tokens', title: 'Map design tokens' }
  ],
  active: [
    { id: 'prototype', title: 'Prototype interaction' },
    { id: 'edge', title: 'Test edge cases' }
  ],
  shipped: [
    { id: 'docs', title: 'Document verdict' }
  ]
};

export const initialTiles = [
  { id: 'alpha', title: 'Alpha', hue: 'bg-primary text-primary-foreground' },
  { id: 'beta', title: 'Beta', hue: 'bg-accent text-accent-foreground' },
  { id: 'gamma', title: 'Gamma', hue: 'bg-secondary text-secondary-foreground' },
  { id: 'delta', title: 'Delta', hue: 'bg-muted text-foreground' },
  { id: 'epsilon', title: 'Epsilon', hue: 'bg-card text-card-foreground' },
  { id: 'zeta', title: 'Zeta', hue: 'bg-primary text-primary-foreground' }
];