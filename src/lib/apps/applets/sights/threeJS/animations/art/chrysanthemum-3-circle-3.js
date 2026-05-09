/*
Draw numPolygons transparent circles at position
    globalRadius * Math.cos(phi(i, numPolygons)),
    globalRadius * Math.sin(phi(i, numPolygons)),
    0

Create two groups and add circles with even i to the first group and odd i to the second group
Rotate one group clockwise and the other counterclockwise
*/

import {
    CircleGeometry,
    Group,
    MeshBasicMaterial,
    Mesh
} from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum3_circle3',
        category: 'art',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'chrysanthemum3-circle3',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 1000,
                minValue: 3
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 1000,
                minValue: 0
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 1
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 1
            },
        },
        text: 'chrysanthemum 33'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;

        const groupLeft = new Group();
        const groupRight = new Group();

        const meshes = [];

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        Array.from({ length: numPolygons }, (_, i) => {

            const material = new MeshBasicMaterial({
                color: colorNodes(i),
                opacity: 2e-1,
                transparent: true,
            });

            const mesh = new Mesh(geometry, material);

            if (numPolygons > 1) mesh.position.set(
                globalRadius * Math.cos(phi(i, numPolygons)),
                globalRadius * Math.sin(phi(i, numPolygons)),
                0
            )

            if (i % 2 === 0) {
                groupLeft.add(mesh);
            } else {
                groupRight.add(mesh);
            }

        });

        groupLeft.tick = delta => groupLeft.rotateZ(1e-1 * delta);
        groupRight.tick = delta => groupRight.rotateZ(-1e-1 * delta);

        meshes.push(groupLeft);
        meshes.push(groupRight);

        return meshes;

    }

}
