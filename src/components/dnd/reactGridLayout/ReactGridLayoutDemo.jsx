import React, { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { createCanvasBlocks, createColumns, createTaskItems, createTileItems, initialColumns, initialTasks, initialTiles } from '@/utils/dndHelpers';
import DragItemCard from '../shared/DragItemCard';
import KanbanColumnShell from '../shared/KanbanColumnShell';
import CapabilityNote from '../CapabilityNote';

const AutoGrid = GridLayout;
const CARD_ROW_HEIGHT = 60;

function layoutFor(items, isGrid) {
  return items.map((item, index) => ({ i: item.id, x: isGrid ? index % 3 : 0, y: isGrid ? Math.floor(index / 3) : index, w: isGrid ? 1 : 3, h: 1 }));
}

function SortableGrid({ useCase, testSettings = {} }) {
  const isGrid = useCase === 'grid';
  const [items, setItems] = useState(isGrid ? initialTiles : initialTasks);
  const [layout, setLayout] = useState(layoutFor(items, isGrid));
  useEffect(() => {
    const nextItems = isGrid ? createTileItems(testSettings.itemCount || 6) : createTaskItems(testSettings.itemCount || 4);
    setItems(nextItems);
    setLayout(layoutFor(nextItems, isGrid));
  }, [isGrid, testSettings.itemCount]);
  return (
    <AutoGrid className="rgl-dndbench rounded-3xl border bg-background/70 p-2" width={680} cols={3} rowHeight={CARD_ROW_HEIGHT} layout={layout} onLayoutChange={setLayout} compactType={isGrid ? null : 'vertical'} isResizable={false}>
      {items.map((item) => <div key={item.id} className="h-full"><DragItemCard title={item.title} className="h-full" disableHover /></div>)}
    </AutoGrid>
  );
}

function ColumnGrid({ cards }) {
  const [layout, setLayout] = useState(layoutFor(cards, false));
  useEffect(() => setLayout(layoutFor(cards, false)), [cards]);
  return (
    <AutoGrid className="rgl-dndbench" width={210} cols={1} rowHeight={CARD_ROW_HEIGHT} layout={layout} onLayoutChange={setLayout} compactType="vertical" isResizable={false} margin={[0, 12]}>
      {cards.map((card) => <div key={card.id} className="h-full"><DragItemCard title={card.title} className="h-full" disableHover /></div>)}
    </AutoGrid>
  );
}

function KanbanGrid({ testSettings = {} }) {
  const [columns, setColumns] = useState(initialColumns);
  useEffect(() => setColumns(createColumns(testSettings.cardsPerColumn || 2)), [testSettings.cardsPerColumn]);
  return (
    <>
      <CapabilityNote>React Grid Layout is grid-native, so this Kanban template uses its built-in layout dragging to reorder cards within each column; cross-column movement is not native.</CapabilityNote>
      <div className="grid grid-cols-1 gap-4 p-1 md:grid-cols-3">{Object.keys(columns).map((id) => <KanbanColumnShell key={id} title={id}><ColumnGrid cards={columns[id]} /></KanbanColumnShell>)}</div>
    </>
  );
}

function CanvasGrid({ testSettings = {} }) {
  const [blocks, setBlocks] = useState(createCanvasBlocks(testSettings.blockCount || 3));
  const [layout, setLayout] = useState([]);
  useEffect(() => {
    const nextBlocks = createCanvasBlocks(testSettings.blockCount || 3);
    setBlocks(nextBlocks);
    setLayout(nextBlocks.map((block, index) => ({ i: block.id, x: index * 2, y: index, w: 2, h: 1 })));
  }, [testSettings.blockCount]);
  return (
    <AutoGrid className="rgl-dndbench min-h-[380px] rounded-3xl border bg-muted/40 p-2" width={680} cols={8} rowHeight={CARD_ROW_HEIGHT} layout={layout} onLayoutChange={setLayout} compactType={null} isBounded={!!testSettings.restrictToContainer} isResizable>
      {blocks.map((block) => <div key={block.id} className="h-full"><DragItemCard title={block.title} className="h-full" disableHover /></div>)}
    </AutoGrid>
  );
}

export default function ReactGridLayoutDemo({ useCase, testSettings }) {
  if (useCase === 'kanban') return <KanbanGrid testSettings={testSettings} />;
  if (useCase === 'canvas') return <CanvasGrid testSettings={testSettings} />;
  return <SortableGrid useCase={useCase} testSettings={testSettings} />;
}