# dndbench

A hands-on playground for comparing drag-and-drop libraries side by side, so you
can pick the right one for your use case before writing a line of code.

dndbench runs the **same** scenario — sortable lists, Kanban boards, grids, and
free-form canvas — across multiple libraries at once, each using its own idiomatic
API. Because every pane shares identical test data and settings, any difference you
notice comes from the library itself, not from an uneven setup.

## Libraries compared

- [dnd-kit](https://github.com/clauderic/dnd-kit)
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- [@atlaskit/pragmatic-drag-and-drop](https://github.com/atlassian/pragmatic-drag-and-drop)
- [react-dnd](https://github.com/react-dnd/react-dnd)
- [react-draggable](https://github.com/react-grid-layout/react-draggable)
- [SortableJS](https://github.com/SortableJS/Sortable)
- [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)
- [react-rnd](https://github.com/bokuweb/react-rnd)

## Use cases

| Template | What it tests |
| --- | --- |
| Sortable list | Reorder stability within a vertical list |
| Multi-list Kanban | Cross-column card movement |
| Grid / 2D | Spatial reordering of tiles |
| Free-form canvas | Raw x/y coordinate control |

## Features

- Select up to four libraries and compare them in identical side-by-side panes.
- Switch test templates and tweak shared settings (item counts, cards per column).
- Toggle native feature constraints (axis lock, restrict-to-container) per template.
- A **Compare Features** matrix showing which capabilities each library supports natively.
- Selections persist locally so you can pick up where you left off.

## Tech stack

Built with React, Vite, Tailwind CSS, and shadcn/ui on the [Base44](https://base44.com) platform.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL printed in your terminal.

## Contributing

Contributions and issues are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md).
If you spot an inaccuracy in the feature matrix or want to add a library, please
open an issue or a pull request.

## License

[MIT](./LICENSE) © Tristan Rhodes
