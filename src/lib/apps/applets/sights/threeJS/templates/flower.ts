import {
    BufferGeometry,
    CircleGeometry,
    Group,
    Line,
    LineBasicMaterial,
    MeshBasicMaterial,
    Mesh,
    Vector3
} from "three";

import { colorNodes, phi } from "../utils/animationUtils";
import { polygon } from "../utils/geomUtils";

export function Flower (
    rootPosition: Vector3,
    pistolPosition: Vector3,
    petalRadius: number,
    numPetals: number,
    numNodes: number,
    petalColor: number,
    pistolColor: number
) {

  const stemVertices = [];

  stemVertices.push(rootPosition);
  stemVertices.push(pistolPosition);

  const stemGeometry = new BufferGeometry().setFromPoints(stemVertices);;

  const stemMaterial = new LineBasicMaterial({ color: colorNodes(3) });

  const stemMesh = new Line(stemGeometry, stemMaterial);

  const petalGroup = new Group();

  for (let i = 0; i < numPetals; ++i) {

    const petalCenter = new Vector3(
      Math.cos(phi(i, numPetals)),
      Math.sin(phi(i, numPetals)),
      0
    ).multiplyScalar(petalRadius).add(pistolPosition);

    const petal = polygon(petalCenter, petalRadius, numNodes, phi(i, numPetals), petalColor);

    petalGroup.add(petal);

  }

  const pistolGeometry = new CircleGeometry(petalRadius / 3, 32);
  const pistolMaterial = new MeshBasicMaterial({ color: pistolColor, wireframe: false });

  const pistolMesh = new Mesh(pistolGeometry, pistolMaterial);
  
  pistolMesh.position.copy(pistolPosition);

  return [stemMesh, petalGroup, pistolMesh];

}
