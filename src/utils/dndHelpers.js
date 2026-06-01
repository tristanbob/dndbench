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
  { id: 'audit', title: 'apple' },
  { id: 'motion', title: 'pear' },
  { id: 'mobile', title: 'plum' },
  { id: 'state', title: 'lime' }
];

export const initialColumns = {
  backlog: [
    { id: 'brief', title: 'red' },
    { id: 'tokens', title: 'blue' }
  ],
  active: [
    { id: 'prototype', title: 'green' },
    { id: 'edge', title: 'gold' }
  ],
  shipped: [
    { id: 'docs', title: 'teal' }
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

export const createTaskItems = (count) => Array.from({ length: count }, (_, index) => {
  const source = initialTasks[index % initialTasks.length];
  return {
    ...source,
    id: `${source.id}-${index + 1}`,
    title: index < initialTasks.length ? source.title : `${source.title} ${index + 1}`
  };
});

export const createTileItems = (count) => Array.from({ length: count }, (_, index) => {
  const source = initialTiles[index % initialTiles.length];
  return {
    ...source,
    id: `${source.id}-${index + 1}`,
    title: index < initialTiles.length ? source.title : `${source.title} ${index + 1}`
  };
});

export const createColumns = (cardsPerColumn) => Object.fromEntries(
  Object.keys(initialColumns).map((columnId) => [
    columnId,
    Array.from({ length: cardsPerColumn }, (_, index) => {
      const source = initialColumns[columnId][index % initialColumns[columnId].length];
      return {
        ...source,
        id: `${columnId}-${source.id}-${index + 1}`,
        title: index < initialColumns[columnId].length ? source.title : `${source.title} ${index + 1}`
      };
    })
  ])
);

const canvasWords = ['Drag', 'these', 'boxes', 'around', 'anywhere', 'you', 'like', 'on', 'the', 'canvas'];

export const createCanvasBlocks = (count) => Array.from({ length: count }, (_, index) => ({
  id: `block-${index + 1}`,
  title: canvasWords[index % canvasWords.length],
  x: 30 + (index % 4) * 95,
  y: 40 + Math.floor(index / 4) * 130
}));