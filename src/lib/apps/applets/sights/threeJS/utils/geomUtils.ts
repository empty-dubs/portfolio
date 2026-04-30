import {
    BufferGeometry,
    LineBasicMaterial,
    LineLoop,
    Vector3

} from 'three';

import { phi } from './animationUtils';

export function polygon (
  center: Vector3,
  radius: number,
  numVertices: number,
  theta: number,
  color: number,
  axis: string | null = null
) {

  const vertices: Vector3[] = [];

  Array.from({ length: numVertices}, (_, i) => {
    vertices.push(
      new Vector3(
        Math.sin(phi(i, numVertices) + theta),
        Math.cos(phi(i, numVertices) + theta),
        0
      ).multiplyScalar(radius).add(center)
    );
  });

  const geometry = new BufferGeometry().setFromPoints(vertices);

  const material = new LineBasicMaterial({ color: color });

  const lineLoop = new LineLoop(geometry, material);

  if (axis === 'relative') lineLoop.position.set(center.x, center.y, center.z);

  return lineLoop;

}
