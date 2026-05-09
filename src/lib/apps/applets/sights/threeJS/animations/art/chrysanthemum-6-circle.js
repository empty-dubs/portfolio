/*
Draw numPolygons transparent circles at position
    globalRadius * Math.cos(phi(i, numPolygons)),
    globalRadius * Math.sin(phi(i, numPolygons)),
    -3
Each circle, i,  should rotate according to the following rule
    i % 2 === 0 ? mesh.rotateZ(1e-1 * delta) : -mesh.rotateZ(1e-1 * delta);

Create two groups and add circles with even i to the first group and odd i to the second group
Scale and rotate each group according to
    group.scale.set(
        5e-1 + (1 + Math.abs( Math.sin(group.dt))),
        5e-1 + (1 + Math.abs( Math.sin(group.dt))),
        0
    );
    group.rotateZ(delta);
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
        address: '/three#art_chrysanthemum6_circle',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'chrysanthemum6-circle',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 1000,
                minValue: 3
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 1000,
                minValue: 0
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 2,
                currentValue: 1,
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
        text: 'chrysanthemum 6 circle'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshGroups = [];

        const group1 = new Group();
        const group2 = new Group();

        group1.dt = 0;
        group2.dt = 0;

        group1.tick = delta => {
            group1.dt += 1e-1 * delta;
            group1.scale.set(5e-1 + (1 + Math.abs( Math.sin(group1.dt))), 5e-1 + (1 + Math.abs( Math.sin(group1.dt))), 0);
            group1.rotateZ(delta);
        }

        group2.tick = delta => {
            group2.dt += 1e-1 * delta;
            group2.scale.set(5e-1 + (1 + Math.abs( Math.sin(-group2.dt))), 5e-1 + (1 + Math.abs( Math.sin(-group2.dt))), 0);
            group1.rotateZ(-delta);
        }

        const color = colorNodes(3);

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        function getMesh(i) {

            const material = new MeshBasicMaterial({
                color,
                opacity: 4e-1,
                transparent: true,
            });

            if (i % 2 === 0) {
                material.color.set(colorNodes(4))
            } else {
                material.color.set(colorNodes(3));
            }
    
            const mesh = new Mesh(geometry, material);

            mesh.position.set(
                globalRadius * Math.cos(phi(i, numPolygons)),
                globalRadius * Math.sin(phi(i, numPolygons)),
                -3
            );

            return mesh;
        }

        Array.from({ length: numPolygons }, (_, i) => {
            const mesh = getMesh(i);

            if (i % 2 === 0) {
                mesh.tick = delta => mesh.rotateZ(1e-1 * delta);
                
                group1.add(mesh);
            } else {
                mesh.tick = delta => mesh.rotateZ(-1e-1 * delta);
                
                group2.add(mesh);
            }
        });

        meshGroups.push(group1);
        meshGroups.push(group2);

        return meshGroups;

    }

}
