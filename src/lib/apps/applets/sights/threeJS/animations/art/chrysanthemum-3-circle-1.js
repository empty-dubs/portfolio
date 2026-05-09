/*
Draw numPolygons transparent circles at position
    globalRadius * Math.cos(phi(i, numPolygons)),
    globalRadius * Math.sin(phi(i, numPolygons)),
    0
Each circle, i,  should rotate according to the following rule
    mesh.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;

Add all circles to a group
Rotate the group
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
        address: '/three#art_chrysanthemum3_circle',
        category: 'art',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'chrysanthemum3-circle',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 64,
                minValue: 3
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 24,
                minValue: 0
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 2,
                minValue: 2
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 1
            },
        },
        text: 'chrysanthemum 31'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;

        const group = new Group();

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

            mesh.tick = delta => mesh.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;

            group.add(mesh);

        });

        group.tick = delta => group.rotateZ(1e-1 * delta);

        meshes.push(group);

        return meshes;

    }

}
