// Mirrors dnd-kit's restrictToParentElement: clamps the live drag transform
// so the dragged node stays inside the given container element.
export default function makeRestrictToBoundsModifier(containerRef, enabled) {
  return ({ transform, draggingNodeRect }) => {
    if (!enabled || !containerRef.current || !draggingNodeRect) return transform;
    const container = containerRef.current.getBoundingClientRect();
    const minX = container.left - draggingNodeRect.left;
    const maxX = container.right - draggingNodeRect.right;
    const minY = container.top - draggingNodeRect.top;
    const maxY = container.bottom - draggingNodeRect.bottom;
    return {
      ...transform,
      x: Math.max(minX, Math.min(transform.x, maxX)),
      y: Math.max(minY, Math.min(transform.y, maxY))
    };
  };
}