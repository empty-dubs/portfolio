import {
    BufferGeometry,
    Group,
    Line,
    LineBasicMaterial,
    Vector3
} from "three";

import { phi } from "../utils/animationUtils";

export function Star (
    center: Vector3,
    numStems: number,
    numSplits: number,
    radius: number,
    color: number
): Group[] {

  const stemGroup = new Group();
  const splitGroup = new Group();

  for (let i = 0; i < numStems; ++i) {

    const stemVertices = [];

    stemVertices.push(center);
    stemVertices.push(
      new Vector3(
        Math.sin(phi(i, numStems)),
        Math.cos(phi(i, numStems))
      ).multiplyScalar(radius).add(center)
    );

    const stemGeometry = new BufferGeometry().setFromPoints(stemVertices);

    const stemMaterial = new LineBasicMaterial(
      {
        color: color
      }
    );

    const line = new Line(stemGeometry, stemMaterial);

    stemGroup.add(line);

    for (let j = 0; j < numSplits; ++j) {

      const splitVertices = [];

      splitVertices.push(
        new Vector3(
          Math.sin(phi(i, numStems)),
          Math.cos(phi(i, numStems)),
          0
        ).multiplyScalar(radius).add(center)
      );

      splitVertices.push(
        new Vector3(
          Math.sin(phi(i, numStems) + (j + 2) * Math.PI / 4),
          Math.cos(phi(i, numStems) + (j + 2) * Math.PI / 4),
          0
        ).multiplyScalar(radius / 2).add(center)
      );

      const splitGeometry = new BufferGeometry().setFromPoints(splitVertices);

      const splitMaterial = new LineBasicMaterial({ color: color });

      const line = new Line(splitGeometry, splitMaterial);

      splitGroup.add(line);

    }

  }

  return [stemGroup, splitGroup];

}
