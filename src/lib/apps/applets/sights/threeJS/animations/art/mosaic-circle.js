/*
Draw numPolygons * numPolygons * numPolygons transparent circles at position
    (globalRadius * Math.cos(phi(i, numPolygons)) + polygonRadius * Math.cos(phi(j, numPolygons))) * Math.sin(phi(k, numPolygons)),
    (globalRadius * Math.sin(phi(i, numPolygons)) + polygonRadius * Math.sin(phi(j, numPolygons))) * Math.cos(phi(k, numPolygons)),
    0

Each circle, i, j, is added to a group, polyGroup, and this group is translated to
    (globalRadius * Math.cos(phi(i, numPolygons)) + polygonRadius * Math.cos(phi(j, numPolygons))) * Math.sin(phi(k, numPolygons)),
    (globalRadius * Math.sin(phi(i, numPolygons)) + polygonRadius * Math.sin(phi(j, numPolygons))) * Math.cos(phi(k, numPolygons)),
    0

Rotate each polyGroup according to
    i % 2 === 0 ? polyGroup.rotateZ(delta / 2) : polyGroup.rotateZ(-delta / 2);

Add all polyGroups to a final group, parentGroup
*/

import {
    CircleGeometry,
    Group,
    MeshBasicMaterial,
    Mesh,
    Vector3
} from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#math_mosaic_circle',
        category: 'math',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'mosaic-circle',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 1000,
                minValue: 3
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 1000,
                minValue: 0
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 50,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 50,
                minValue: 0
            }
        },
        text: 'mosaic circle'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshGroups = [];

        const parentGroup = new Group();

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        function getPosition(i, j, k) {
            return new Vector3(
                (globalRadius * Math.cos(phi(i, numPolygons)) + polygonRadius * Math.cos(phi(j, numPolygons))) * Math.sin(phi(k, numPolygons)),
                (globalRadius * Math.sin(phi(i, numPolygons)) + polygonRadius * Math.sin(phi(j, numPolygons))) * Math.cos(phi(k, numPolygons)),
                0
            );
        }

        function getMesh(i) {

            const material = new MeshBasicMaterial({
                color: colorNodes(i, 'cool'),
                opacity: 4e-2,
                transparent: true,
            });
    
            return new Mesh(geometry, material);
        }

        Array.from({ length: numPolygons }, (_, i) => {
            Array.from({ length: numPolygons }, (_, j) => {
                Array.from({ length: numPolygons }, (_, k) => {

                    const polyPosition = getPosition(i, j, k);
    
                    if (!polyPosition.equals(new Vector3(0, 0, 0))) {
                        const polyGroup = new Group();
                        const mesh = getMesh(i);

                        mesh.position.copy(polyPosition);

                        polyGroup.add(mesh);

                        polyGroup.position.copy(polyPosition);

                        polyGroup.tick = delta => i % 2 === 0 ? polyGroup.rotateZ(1e-1 * delta) : polyGroup.rotateZ(-1e-1 * delta / 2);

                        parentGroup.add(polyGroup);
                    }

                });
            });
        });

        meshGroups.push(parentGroup);

        return meshGroups;

    }

}
