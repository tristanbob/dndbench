import React, { useEffect, useId, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDndList from './reactDnd/ReactDndList';
import ReactDndKanban from './reactDnd/ReactDndKanban';
import ReactDndCanvas from './reactDnd/ReactDndCanvas';
import ReactDndDragPreview from './reactDnd/ReactDndDragPreview';

function InnerDemo({ useCase, testSettings }) {
  if (useCase === 'canvas') return <ReactDndCanvas testSettings={testSettings} />;
  if (useCase === 'kanban') return <ReactDndKanban testSettings={testSettings} />;
  return <ReactDndList key={useCase} useCase={useCase} testSettings={testSettings} />;
}

export default function ReactDndDemo({ useCase, testSettings }) {
  // Multiple react-dnd panes can render side-by-side. The HTML5 backend attaches
  // global listeners to `window`, and react-dnd forbids two HTML5 backends sharing
  // the same window. Scope each backend to this pane's own root element so they
  // don't collide ("Cannot have two HTML5 backends at the same time").
  const rootRef = useRef(null);
  const instanceId = useId();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const backendOptions = { rootElement: rootRef.current ?? undefined };

  return (
    <div ref={rootRef}>
      {ready && (
        <DndProvider key={instanceId} backend={HTML5Backend} options={backendOptions}>
          <InnerDemo useCase={useCase} testSettings={testSettings} />
          <ReactDndDragPreview />
        </DndProvider>
      )}
    </div>
  );
}