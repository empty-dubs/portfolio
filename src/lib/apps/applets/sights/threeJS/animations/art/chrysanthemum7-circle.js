/*
Draw numPolygons * numPolygons transparent circles at position
    globalRadius * (Math.sin(phi(i, numPolygons)) + Math.cos(phi(j, numPolygons))),
    globalRadius * (Math.cos(phi(i, numPolygons)) + Math.sin(phi(j, numPolygons))),
    0
Each circle, i,  should rotate according to the following rule
    i % 2 === 0 ? mesh.rotateZ(1e-1 * delta) : -mesh.rotateZ(1e-1 * delta);

Create two groups and add circles with even i to the first group and odd i to the second group
Rotate each group according to
    group1.tick = delta => group1.rotateZ(delta);
    group2.tick = delta => group1.rotateZ(-delta);
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
        address: '/three#art_chrysanthemum7_circle',
        category: 'art',
        controllable: true,
        dynamic: true,
        hidden: false,
        name: 'chrysanthemum7-circle',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 1000,
                minValue: 0
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 1000,
                minValue: 0
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 1000,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 1000,
                minValue: 0
            }
        },
        text: 'chrysanthemum 7 circle'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshGroups = [];

        const group1 = new Group();
        const group2 = new Group();

        group1.tick = delta => group1.rotateZ(delta);
        group2.tick = delta => group1.rotateZ(-delta);

        const color = colorNodes(2);

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        function getMesh(i, j) {

            const material = new MeshBasicMaterial({
                color,
                opacity: 1e-2,
                transparent: true,
            });
    
            const mesh = new Mesh(geometry, material);

            mesh.position.set(
                globalRadius * (Math.sin(phi(i, numPolygons)) + Math.cos(phi(j, numPolygons))),
                globalRadius * (Math.cos(phi(i, numPolygons)) + Math.sin(phi(j, numPolygons))),
                0
            );

            return mesh;
        }

        Array.from({ length: numPolygons }, (_, i) => {
            Array.from({ length: numPolygons }, (_, j) => {
                const mesh = getMesh(i, j);

                if (i % 2 === 0) {
                    mesh.tick = delta => mesh.rotateZ(1e-1 * delta);
                    
                    group1.add(mesh);
                } else {
                    mesh.tick = delta => mesh.rotateZ(-1e-1 * delta);
                    
                    group2.add(mesh);
                }
            });
        });

        meshGroups.push(group1);
        meshGroups.push(group2);

        return meshGroups;

    }

}
