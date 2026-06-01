export const libraries = [
  {
    id: 'hello-pangea',
    name: '@hello-pangea/dnd',
    friendlyName: 'Pangea DnD',
    badge: 'Base44 recommended',
    tone: 'bg-primary text-primary-foreground',
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
export const featureSettings = {
  canvas: [
    {
      key: 'restrictToContainer',
      label: 'Restrict to container',
      description: 'Keep blocks inside the canvas instead of dragging beyond its edges.',
      support: { 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true }
    },
    {
      key: 'axisLock',
      label: 'Axis lock',
      description: 'Constrain block movement to a single direction.',
      type: 'options',
      options: ['none', 'x', 'y'],
      default: 'none',
      support: { 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true }
    }
  ]
};

export const dragSettings = [
  {
    key: 'restrictToContainer',
    label: 'Restrict to container',
    description: 'Keeps dragged items inside the visible demo area instead of letting them move beyond the boundary.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'sortablejs': false }
  },
  {
    key: 'axisLock',
    label: 'Axis lock',
    description: 'Choose horizontal, vertical, or none to control which direction dragged items can move.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': true, 'sortablejs': true }
  },
  {
    key: 'dragHandle',
    label: 'Drag handle',
    description: 'Requires grabbing the handle icon instead of dragging from anywhere on the card.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': true, 'react-draggable': true, 'sortablejs': true }
  },
  {
    key: 'collisionDetection',
    label: 'Collision detection',
    description: 'Changes how the library decides which item or drop zone the dragged item is closest to.',
    support: { 'hello-pangea': false, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': false, 'sortablejs': false }
  },
  {
    key: 'keyboardDrag',
    label: 'Keyboard drag',
    description: 'Lets users reorder items with the keyboard for better accessibility. It is always enabled when supported.',
    support: { 'hello-pangea': true, 'dnd-kit': true, 'react-dnd': false, 'react-draggable': false, 'sortablejs': false }
  }
];