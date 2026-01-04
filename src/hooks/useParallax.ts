
import { useMousePosition } from './useMousePosition';

export const useParallax = (strength: number = 20) => {
  const { x, y } = useMousePosition();
  return {
    x: x * strength, // Invert or scale as needed
    y: y * strength
  };
};
