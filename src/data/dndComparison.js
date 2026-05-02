export const libraries = [
  {
    id: 'hello-pangea',
    name: '@hello-pangea/dnd',
    badge: 'Base44 recommended',
    tone: 'bg-primary text-primary-foreground',
    summary: 'The pragmatic default for beautiful sortable lists and Kanban boards in React apps.',
    bestFor: 'Task boards, ordered lists, approachable production UI',
    tradeoff: 'Not designed for free-form canvas, file drop, or complex nested geometries.'
  },
  {
    id: 'dnd-kit',
    name: 'dnd-kit',
    badge: 'Modern toolkit',
    tone: 'bg-accent text-accent-foreground',
    summary: 'Composable primitives with excellent sensor control, accessibility, and custom layouts.',
    bestFor: 'Sortable grids, custom interactions, advanced product interfaces',
    tradeoff: 'More architectural decisions and wiring than list-first libraries.'
  },
  {
    id: 'react-dnd',
    name: 'react-dnd',
    badge: 'Low-level power',
    tone: 'bg-secondary text-secondary-foreground',
    summary: 'A backend-driven drag system built for complex drag sources, drop targets, and native file drops.',
    bestFor: 'Canvas tools, file drop, nested drag rules, chessboard-like interactions',
    tradeoff: 'Less turnkey polish for reorderable lists; more code for common UI patterns.'
  }
];

export const useCases = [
  { id: 'sortable', label: 'Sortable list', metric: 'Reorder stability', description: 'Drag one item through a vertical ordered list and evaluate animation, ergonomics, and state clarity.' },
  { id: 'kanban', label: 'Multi-list Kanban', metric: 'Cross-column movement', description: 'Move cards between status columns while preserving order and visual feedback.' },
  { id: 'grid', label: 'Grid / 2D', metric: 'Spatial reordering', description: 'Rearrange tiles in a two-dimensional layout without losing positional context.' },
  { id: 'canvas', label: 'Free-form canvas', metric: 'Coordinate control', description: 'Move blocks around a surface where x/y placement matters more than index order.' },
  { id: 'file', label: 'File drop', metric: 'Native drop support', description: 'Drop files into a target and inspect how naturally the library handles native browser payloads.' },
  { id: 'nested', label: 'Nested drag', metric: 'Hierarchy control', description: 'Drag items inside grouped or nested structures where parent-child rules matter.' }
];

export const scores = {
  'hello-pangea': { sortable: 5, kanban: 5, grid: 3, canvas: 1, file: 1, nested: 2 },
  'dnd-kit': { sortable: 5, kanban: 4, grid: 5, canvas: 4, file: 2, nested: 4 },
  'react-dnd': { sortable: 3, kanban: 4, grid: 4, canvas: 5, file: 5, nested: 5 }
};

export const dragSettings = [
  {
    key: 'restrictToContainer',
    label: 'Restrict to container',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': true }
  },
  {
    key: 'axisLock',
    label: 'Axis lock',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': true }
  },
  {
    key: 'dragHandle',
    label: 'Drag handle',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': true }
  },
  {
    key: 'collisionDetection',
    label: 'Collision detection',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': true }
  },
  {
    key: 'keyboardDrag',
    label: 'Keyboard drag',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': false }
  },
  {
    key: 'nativeFileDrop',
    label: 'Native file drop',
    support: { 'hello-pangea': false, 'dnd-kit': false, 'react-dnd': true }
  }
];

export const verdicts = [
  { label: 'Fastest path to polished lists', value: '@hello-pangea/dnd' },
  { label: 'Best modern all-rounder', value: 'dnd-kit' },
  { label: 'Best for native files and rules', value: 'react-dnd' }
];