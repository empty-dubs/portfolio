import { Group, Vector3 } from "three";

import { phi } from "../utils/animationUtils";
import { polygon } from "../utils/geomUtils";

export function sacredGeometry (
    center: Vector3,
    numPolygons: number,
    numNodes: number,
    polygonRadius: number,
    globalRadius: number,
    color: number
) {

  const group = new Group();

  Array.from({ length: numPolygons }, (_, i) => {
    const polyCenter = new Vector3(
        Math.cos(phi(i, numPolygons)),
        Math.sin(phi(i, numPolygons)),
        0
    ).multiplyScalar(globalRadius).add(center);

    const poly = polygon(polyCenter, polygonRadius, numNodes, phi(i, numNodes), color);

    group.add(poly);
  });

  return group;

}
