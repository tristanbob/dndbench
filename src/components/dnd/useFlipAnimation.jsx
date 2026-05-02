import { useLayoutEffect, useRef } from 'react';

export default function useFlipAnimation(dependencies = []) {
  const positionsRef = useRef(new Map());
  const elementsRef = useRef(new Map());

  const setAnimatedNode = (id, node) => {
    if (node) {
      elementsRef.current.set(id, node);
    } else {
      elementsRef.current.delete(id);
    }
  };

  useLayoutEffect(() => {
    const nextPositions = new Map();

    elementsRef.current.forEach((node, id) => {
      const next = node.getBoundingClientRect();
      const previous = positionsRef.current.get(id);
      nextPositions.set(id, next);

      if (!previous) return;

      const deltaX = previous.left - next.left;
      const deltaY = previous.top - next.top;

      if (deltaX === 0 && deltaY === 0) return;

      node.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: 'translate(0, 0)' }
        ],
        { duration: 180, easing: 'cubic-bezier(0.2, 0, 0, 1)' }
      );
    });

    positionsRef.current = nextPositions;
  }, dependencies);

  return setAnimatedNode;
}