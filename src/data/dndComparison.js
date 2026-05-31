export const libraries = [
  {
    id: 'hello-pangea',
    name: '@hello-pangea/dnd',
    badge: 'Base44 recommended',
    tone: 'bg-primary text-primary-foreground',
    accent: {
      active: 'border-emerald-500 bg-emerald-500 text-white',
      idle: 'border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100',
      dot: 'bg-emerald-500'
    },
    summary: 'The pragmatic default for beautiful sortable lists and Kanban boards in React apps.',
    bestFor: 'Task boards, ordered lists, approachable production UI',
    tradeoff: 'Not designed for free-form canvas, file drop, or complex nested geometries.'
  },
  {
    id: 'dnd-kit',
    name: 'dnd-kit',
    badge: 'Modern toolkit',
    tone: 'bg-accent text-accent-foreground',
    accent: {
      active: 'border-violet-500 bg-violet-500 text-white',
      idle: 'border-violet-200 bg-violet-50 text-violet-900 hover:bg-violet-100',
      dot: 'bg-violet-500'
    },
    summary: 'Composable primitives with excellent sensor control, accessibility, and custom layouts.',
    bestFor: 'Sortable grids, custom interactions, advanced product interfaces',
    tradeoff: 'More architectural decisions and wiring than list-first libraries.'
  },
  {
    id: 'react-dnd',
    name: 'react-dnd',
    badge: 'Low-level power',
    tone: 'bg-secondary text-secondary-foreground',
    accent: {
      active: 'border-sky-500 bg-sky-500 text-white',
      idle: 'border-sky-200 bg-sky-50 text-sky-900 hover:bg-sky-100',
      dot: 'bg-sky-500'
    },
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


export const dragSettings = [
  {
    key: 'restrictToContainer',
    label: 'Restrict to container',
    description: 'Keeps dragged items inside the visible demo area instead of letting them move beyond the boundary.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false }
  },
  {
    key: 'axisLock',
    label: 'Axis lock',
    description: 'Choose horizontal, vertical, or none to control which direction dragged items can move.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false }
  },
  {
    key: 'dragHandle',
    label: 'Drag handle',
    description: 'Requires grabbing the handle icon instead of dragging from anywhere on the card.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': true }
  },
  {
    key: 'collisionDetection',
    label: 'Collision detection',
    description: 'Changes how the library decides which item or drop zone the dragged item is closest to.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false }
  },
  {
    key: 'keyboardDrag',
    label: 'Keyboard drag',
    description: 'Lets users reorder items with the keyboard for better accessibility. It is always enabled when supported.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': false }
  },
  {
    key: 'nativeFileDrop',
    label: 'Native file drop',
    description: 'Allows dropping real files from the computer into the demo drop zone.',
    support: { 'hello-pangea': false, 'dnd-kit': false, 'react-dnd': true }
  }
];