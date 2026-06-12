import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import DragItemCard from '../shared/DragItemCard';
import { CARD } from './itemTypes';

export default function DragCard({ item, index, moveItem, moveCardToColumnAt, columnId }) {
  const cardRef = useRef(null);
  const [, drop] = useDrop({ accept: CARD, hover: (dragged) => {
    if (dragged.columnId === columnId) {
      if (dragged.index !== index) { moveItem(dragged.index, index); dragged.index = index; }
    } else if (moveCardToColumnAt) {
      // Cross-column: insert the dragged card at this card's position so siblings open a gap.
      moveCardToColumnAt(dragged.columnId, columnId, dragged.id, index);
      dragged.columnId = columnId;
      dragged.index = index;
    }
  } });
  const [{ isDragging }, drag, preview] = useDrag({ type: CARD, item: () => {
    const rect = cardRef.current?.getBoundingClientRect();
    return { id: item.id, index, columnId, preview: { title: item.title, meta: item.meta, width: rect?.width || 280, sourceX: rect?.left || 0, sourceY: rect?.top || 0 } };
  }, collect: (monitor) => ({ isDragging: monitor.isDragging() }) });
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const connectCard = (node) => {
    cardRef.current = node;
    drop(node);
    drag(node);
  };

  return <DragItemCard title={item.title} meta={item.meta} isDragging={isDragging} rootRef={connectCard} draggingClassName="opacity-0" />;
}