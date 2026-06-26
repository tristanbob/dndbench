export const libraries = [
  {
    id: 'hello-pangea',
    name: '@hello-pangea/dnd',
    friendlyName: 'Pangea DnD',
    badge: 'Base44 recommended',
    tone: 'bg-primary text-primary-foreground',
    accent: {
      selector: 'border-blue-300 bg-blue-50 text-blue-700',
      mark: 'border-blue-300 bg-blue-100 text-blue-700',
      pane: 'border-blue-300 bg-blue-50 shadow-blue-200/60',
      dot: 'bg-blue-500',
      ping: 'bg-blue-500/70',
      title: 'text-blue-950',
      playground: 'ring-1 ring-blue-200/80'
    },
    summary: 'The pragmatic default for beautiful sortable lists and Kanban boards in React apps.',
    bestFor: 'Task boards, ordered lists, approachable production UI',
    tradeoff: 'Not designed for free-form canvas or complex nested geometries.'
  },
  {
    id: 'dnd-kit',
    name: 'dnd-kit',
    friendlyName: 'DnD Kit',
    badge: 'Modern toolkit',
    tone: 'bg-accent text-accent-foreground',
    accent: {
      selector: 'border-violet-300 bg-violet-50 text-violet-700',
      mark: 'border-violet-300 bg-violet-100 text-violet-700',
      pane: 'border-violet-300 bg-violet-50 shadow-violet-200/60',
      dot: 'bg-violet-500',
      ping: 'bg-violet-500/70',
      title: 'text-violet-950',
      playground: 'ring-1 ring-violet-200/80'
    },
    summary: 'Composable primitives with excellent sensor control, accessibility, and custom layouts.',
    bestFor: 'Sortable grids, custom interactions, advanced product interfaces',
    tradeoff: 'More architectural decisions and wiring than list-first libraries.'
  },
  {
    id: 'react-dnd',
    name: 'react-dnd',
    friendlyName: 'React DnD',
    badge: 'Low-level power',
    tone: 'bg-secondary text-secondary-foreground',
    accent: {
      selector: 'border-amber-300 bg-amber-50 text-amber-800',
      mark: 'border-amber-300 bg-amber-100 text-amber-800',
      pane: 'border-amber-300 bg-amber-50 shadow-amber-200/60',
      dot: 'bg-amber-500',
      ping: 'bg-amber-500/70',
      title: 'text-amber-950',
      playground: 'ring-1 ring-amber-200/80'
    },
    summary: 'A backend-driven drag system built for complex drag sources, drop targets, and native file drops.',
    bestFor: 'Canvas tools, nested drag rules, chessboard-like interactions',
    tradeoff: 'Less turnkey polish for reorderable lists; more code for common UI patterns.'
  },
  {
    id: 'react-draggable',
    name: 'react-draggable',
    friendlyName: 'React Draggable',
    badge: 'Lightweight classic',
    tone: 'bg-accent text-accent-foreground',
    accent: {
      selector: 'border-emerald-300 bg-emerald-50 text-emerald-700',
      mark: 'border-emerald-300 bg-emerald-100 text-emerald-700',
      pane: 'border-emerald-300 bg-emerald-50 shadow-emerald-200/60',
      dot: 'bg-emerald-500',
      ping: 'bg-emerald-500/70',
      title: 'text-emerald-950',
      playground: 'ring-1 ring-emerald-200/80'
    },
    summary: 'A tiny, battle-tested wrapper that makes any element draggable with raw x/y position control.',
    bestFor: 'Free-form canvas, simple movable widgets, minimal-dependency setups',
    tradeoff: 'No notion of lists or drop targets — sorting and Kanban must be hand-built on top of positions.'
  },
  {
    id: 'sortablejs',
    name: 'SortableJS',
    friendlyName: 'SortableJS',
    badge: 'Framework-agnostic',
    tone: 'bg-secondary text-secondary-foreground',
    accent: {
      selector: 'border-rose-300 bg-rose-50 text-rose-700',
      mark: 'border-rose-300 bg-rose-100 text-rose-700',
      pane: 'border-rose-300 bg-rose-50 shadow-rose-200/60',
      dot: 'bg-rose-500',
      ping: 'bg-rose-500/70',
      title: 'text-rose-950',
      playground: 'ring-1 ring-rose-200/80'
    },
    summary: 'The de-facto vanilla-JS standard for reorderable lists and cross-list Kanban, usable in any framework.',
    bestFor: 'Sortable lists, multi-list Kanban, non-React stacks',
    tradeoff: 'DOM-driven (needs syncing back to React state) and list-first — no free-form canvas coordinates.'
  }
];

export const useCases = [
  { id: 'sortable', label: 'Sortable list', metric: 'Reorder stability', description: 'Drag one item through a vertical ordered list and evaluate animation, ergonomics, and state clarity.' },
  { id: 'kanban', label: 'Multi-list Kanban', metric: 'Cross-column movement', description: 'Move cards between status columns while preserving order and visual feedback.' },
  { id: 'grid', label: 'Grid / 2D', metric: 'Spatial reordering', description: 'Rearrange tiles in a two-dimensional layout without losing positional context.' },
  { id: 'canvas', label: 'Free-form canvas', metric: 'Coordinate control', description: 'Move blocks around a surface where x/y placement matters more than index order.' }
];


// Feature toggles shown per template (use case). Each lists which libraries
// support it live; unsupported libraries still show the toggle with a badge.
const restrictFeature = {
  key: 'restrictToContainer',
  label: 'Restrict to container',
  description: 'Keep items inside the visible demo area instead of dragging beyond its edges.'
};

const axisLockFeature = {
  key: 'axisLock',
  label: 'Axis lock',
  description: 'Constrain movement to a single direction.',
  type: 'options',
  options: ['none', 'x', 'y'],
  default: 'none'
};

// Native feature support matrix for the comparison table. true = built-in API,
// 'partial' = achievable with custom code, false = not supported natively.
export const featureMatrix = [
  {
    key: 'axisLock',
    label: 'Axis lock',
    description: 'Constrain dragging to one direction (x or y).',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': 'partial', 'react-draggable': true, 'sortablejs': false }
  },
  {
    key: 'restrictToContainer',
    label: 'Restrict to container',
    description: 'Keep dragged items inside a bounding element.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': 'partial', 'react-draggable': true, 'sortablejs': false }
  },
  {
    key: 'dragHandle',
    label: 'Drag handle',
    description: 'Start drags only from a dedicated handle element.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': true, 'react-draggable': true, 'sortablejs': true }
  },
  {
    key: 'sortableLists',
    label: 'Sortable lists',
    description: 'Built-in reordering of items within a list.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': 'partial', 'react-draggable': false, 'sortablejs': true }
  },
  {
    key: 'crossContainer',
    label: 'Cross-container moves',
    description: 'Move items between separate lists or columns.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': 'partial', 'react-draggable': false, 'sortablejs': true }
  },
  {
    key: 'freeFormCanvas',
    label: 'Free-form canvas',
    description: 'Position items by raw x/y coordinates.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': true, 'react-draggable': true, 'sortablejs': false }
  },
  {
    key: 'collisionDetection',
    label: 'Custom collision detection',
    description: 'Configure how drop targets are detected.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': false, 'sortablejs': false }
  },
  {
    key: 'keyboardDrag',
    label: 'Keyboard dragging',
    description: 'Reorder items with the keyboard for accessibility.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': false, 'sortablejs': false }
  }
];

export const featureSettings = {
  sortable: [
    { ...restrictFeature, label: 'Restrict to container', description: 'Keep the dragged item inside the list area.', support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'sortablejs': false } }
  ],
  grid: [
    { ...restrictFeature, label: 'Restrict to container', description: 'Keep tiles inside the grid area while dragging.', support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'sortablejs': false } }
  ],
  kanban: [
    { ...restrictFeature, label: 'Restrict to board', description: 'Keep cards inside the board area while dragging.', support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'sortablejs': false } }
  ],
  canvas: [
    { ...restrictFeature, support: { 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true } },
    { ...axisLockFeature, support: { 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true } }
  ]
};