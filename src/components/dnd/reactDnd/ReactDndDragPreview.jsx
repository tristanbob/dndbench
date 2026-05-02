import React from 'react';
import { useDragLayer } from 'react-dnd';
import DragItemCard from '../shared/DragItemCard';
import KanbanColumnShell from '../shared/KanbanColumnShell';

export default function ReactDndDragPreview() {
  const { item, itemType, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset()
  }));

  if (!isDragging || !currentOffset || !item?.preview) return null;

  const style = {
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: 100,
    left: 0,
    top: 0,
    width: item.preview.width,
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
  };

  return (
    <div style={style}>
      {itemType === 'column' ? (
        <KanbanColumnShell title={item.preview.title} isDragging={false} className="bg-background shadow-2xl ring-2 ring-primary/20">
          <div className="space-y-3">
            {item.preview.cards?.map((card) => (
              <DragItemCard key={card.id} title={card.title} meta={card.meta} isDragging={false} />
            ))}
          </div>
        </KanbanColumnShell>
      ) : (
        <DragItemCard title={item.preview.title} meta={item.preview.meta} isDragging={false} className="bg-background shadow-2xl ring-2 ring-primary/20" />
      )}
    </div>
  );
}