import {
    BufferGeometry,
    LineLoop,
    LineBasicMaterial,
    Vector3
} from "three";

import { phi } from "../utils/animationUtils";

export function offsetStar (
    numVertices: number,
    center: Vector3,
    radius: number,
    theta: number,
    offset: number,
    color: number
) {

  const vertices: Vector3[] = [];

  Array.from({ length: numVertices}, (_, i) => {
    vertices.push(
      new Vector3(
        Math.sin(phi((i * (1 + offset)) % numVertices, numVertices) + theta),
        Math.cos(phi((i * (1 + offset)) % numVertices, numVertices) + theta),
        0
      ).multiplyScalar(radius).add(center)
    );
  });

  const geometry = new BufferGeometry().setFromPoints(vertices);

  const material = new LineBasicMaterial(
    {
      color: color
    }
  );

  return new LineLoop(geometry, material);

}
