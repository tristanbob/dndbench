export const libraries = [
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
    id: 'react-grid-layout',
    name: 'react-grid-layout',
    friendlyName: 'React Grid Layout',
    badge: 'Grid specialist',
    tone: 'bg-accent text-accent-foreground',
    accent: {
      selector: 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-700',
      mark: 'border-fuchsia-300 bg-fuchsia-100 text-fuchsia-700',
      pane: 'border-fuchsia-300 bg-fuchsia-50 shadow-fuchsia-200/60',
      dot: 'bg-fuchsia-500',
      ping: 'bg-fuchsia-500/70',
      title: 'text-fuchsia-950',
      playground: 'ring-1 ring-fuchsia-200/80'
    },
    summary: 'A responsive grid layout engine with draggable and resizable widgets.',
    bestFor: 'Dashboards, tile grids, layout editors, widget canvases',
    tradeoff: 'Excellent for grids, less natural for true cross-column Kanban movement.'
  },
  {
    id: 'react-rnd',
    name: 'react-rnd',
    friendlyName: 'React Rnd',
    badge: 'Move + resize',
    tone: 'bg-secondary text-secondary-foreground',
    accent: {
      selector: 'border-orange-300 bg-orange-50 text-orange-700',
      mark: 'border-orange-300 bg-orange-100 text-orange-700',
      pane: 'border-orange-300 bg-orange-50 shadow-orange-200/60',
      dot: 'bg-orange-500',
      ping: 'bg-orange-500/70',
      title: 'text-orange-950',
      playground: 'ring-1 ring-orange-200/80'
    },
    summary: 'A compact draggable and resizable box primitive for positioned UI.',
    bestFor: 'Free-form canvas, resizable widgets, simple editors',
    tradeoff: 'List and Kanban behavior need custom ordering logic.'
  },
  {
    id: 'pragmatic-dnd',
    name: '@atlaskit/pragmatic-drag-and-drop',
    friendlyName: 'Pragmatic DnD',
    badge: 'Low-level modern',
    tone: 'bg-primary text-primary-foreground',
    accent: {
      selector: 'border-cyan-300 bg-cyan-50 text-cyan-700',
      mark: 'border-cyan-300 bg-cyan-100 text-cyan-700',
      pane: 'border-cyan-300 bg-cyan-50 shadow-cyan-200/60',
      dot: 'bg-cyan-500',
      ping: 'bg-cyan-500/70',
      title: 'text-cyan-950',
      playground: 'ring-1 ring-cyan-200/80'
    },
    summary: 'Small composable primitives for building custom drag-and-drop interactions.',
    bestFor: 'Custom product surfaces, flexible drag rules, accessible low-level control',
    tradeoff: 'You build more behavior yourself compared with turnkey sortable libraries.'
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
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': 'partial', 'react-draggable': true, 'sortablejs': false, 'pragmatic-dnd': 'partial', 'react-grid-layout': false, 'react-rnd': true }
  },
  {
    key: 'restrictToContainer',
    label: 'Restrict to container',
    description: 'Keep dragged items inside a bounding element.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': 'partial', 'react-draggable': true, 'sortablejs': false, 'pragmatic-dnd': 'partial', 'react-grid-layout': true, 'react-rnd': true }
  },
  {
    key: 'dragHandle',
    label: 'Drag handle',
    description: 'Start drags only from a dedicated handle element.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': true, 'react-draggable': true, 'sortablejs': true, 'pragmatic-dnd': true, 'react-grid-layout': true, 'react-rnd': true }
  },
  {
    key: 'sortableLists',
    label: 'Sortable lists',
    description: 'Built-in reordering of items within a list.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': 'partial', 'react-draggable': false, 'sortablejs': true, 'pragmatic-dnd': true, 'react-grid-layout': true, 'react-rnd': 'partial' }
  },
  {
    key: 'crossContainer',
    label: 'Cross-container moves',
    description: 'Move items between separate lists or columns.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': 'partial', 'react-draggable': false, 'sortablejs': true, 'pragmatic-dnd': true, 'react-grid-layout': 'partial', 'react-rnd': 'partial' }
  },
  {
    key: 'freeFormCanvas',
    label: 'Free-form canvas',
    description: 'Position items by raw x/y coordinates.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': true, 'react-draggable': true, 'sortablejs': false, 'pragmatic-dnd': true, 'react-grid-layout': true, 'react-rnd': true }
  },
  {
    key: 'collisionDetection',
    label: 'Custom collision detection',
    description: 'Configure how drop targets are detected.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': false, 'sortablejs': false, 'pragmatic-dnd': true, 'react-grid-layout': false, 'react-rnd': false }
  },
  {
    key: 'keyboardDrag',
    label: 'Keyboard dragging',
    description: 'Reorder items with the keyboard for accessibility.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': false, 'sortablejs': false, 'pragmatic-dnd': false, 'react-grid-layout': false, 'react-rnd': false }
  }
];

export const featureSettings = {
  sortable: [
    { ...restrictFeature, label: 'Restrict to container', description: 'Keep the dragged item inside the list area.', support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'sortablejs': false, 'pragmatic-dnd': false, 'react-grid-layout': true, 'react-rnd': true } }
  ],
  grid: [
    { ...restrictFeature, label: 'Restrict to container', description: 'Keep tiles inside the grid area while dragging.', support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'sortablejs': false, 'pragmatic-dnd': false, 'react-grid-layout': true, 'react-rnd': true } }
  ],
  kanban: [
    { ...restrictFeature, label: 'Restrict to board', description: 'Keep cards inside the board area while dragging.', support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'sortablejs': false, 'pragmatic-dnd': false, 'react-grid-layout': true, 'react-rnd': true } }
  ],
  canvas: [
    { ...restrictFeature, support: { 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'pragmatic-dnd': true, 'react-grid-layout': true, 'react-rnd': true } },
    { ...axisLockFeature, support: { 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'pragmatic-dnd': true, 'react-grid-layout': false, 'react-rnd': true } }
  ]
};