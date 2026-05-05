/*
Draw numPolygons transparent circles at position
    globalRadius * Math.cos(phi(i, numPolygons)),
    globalRadius * Math.sin(phi(i, numPolygons)),
    0
Each circle, i, should scale and rotate according to the following rule
    dt += delta;
    if (i % 2 === 0) {
        mesh.scale.set(1 + 1e-1 * Math.cos(dt / 2) *  Math.sin(dt), 1 + 1e-1 * Math.cos(dt / 2) *  Math.sin(dt), 0);
        mesh.rotateZ(2e-1 * delta * Math.sin(2 * dt));
    } else {
        mesh.scale.set(1 - 1e-1 * Math.cos(dt / 2) * Math.sin(dt), 1 - 1e-1 * Math.cos(dt / 2) * Math.sin(dt), 0);
        mesh.rotateZ(-4e-1 * delta);
    }
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
        address: '/three#art_chrysanthemum3_circle4',
        category: 'art',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'chrysanthemum3-circle4',
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
        text: 'chrysanthemum 3 circle 4'
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

            let dt = 0

            mesh.tick = delta => {
                dt += delta;
                if (i % 2 === 0) {
                    mesh.scale.set(1 + 1e-1 * Math.cos(dt / 2) *  Math.sin(dt), 1 + 1e-1 * Math.cos(dt / 2) *  Math.sin(dt), 0);
                    mesh.rotateZ(2e-1 * delta * Math.sin(2 * dt));
                } else {
                    mesh.scale.set(1 - 1e-1 * Math.cos(dt / 2) * Math.sin(dt), 1 - 1e-1 * Math.cos(dt / 2) * Math.sin(dt), 0);
                    mesh.rotateZ(-4e-1 * delta);
                }
            }

            if (i % 2 === 0) {
                groupLeft.add(mesh);
            } else {
                groupRight.add(mesh);
            }

        });

        meshes.push(groupLeft);
        meshes.push(groupRight);

        return meshes;

    }

}
