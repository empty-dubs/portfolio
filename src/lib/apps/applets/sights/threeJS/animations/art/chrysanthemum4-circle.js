/*
NOTE: this is the same as chrysanthemum but with scaling and repositioning along z-axis

Draw numNodes * numNodes transparent circles centered at position
    globalRadius * (Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes))),
    globalRadius * (Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes))),
    -5.5
Each circle, i, j,  should scale and rotate according to the following rule
    mesh.scale.set(2 + (1.3 * Math.cos(dt / 3)), 2 + (1.3 * Math.cos(dt / 3)), 1);

    mesh.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;
*/


import { CircleGeometry, MeshBasicMaterial, Mesh } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum4_circle',
        category: 'art',
        controllable: true,
        dynamic: true,
        hidden: false,
        name: 'chrysanthemum4-circle',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 1000,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 1000,
                minValue: 0
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 1000,
                minValue: 0
            }
        },
        text: 'chrysanthemum 4 circle'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        const color = colorNodes(3);

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        Array.from({ length: numNodes }, (_, i) => {
            Array.from({ length: numNodes }, (_, j) => {

                const material = new MeshBasicMaterial({
                    color,
                    opacity: 2e-1,
                    transparent: true,
                });

                if (i % 2 === 0) {
                    material.color.set(colorNodes(4))
                } else {
                    material.color.set(colorNodes(3));
                }

                const mesh = new Mesh(geometry, material);

                mesh.position.set(
                    globalRadius * (Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes))),
                    globalRadius * (Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes))),
                    -5.5
                );

                let dt = 0;

                mesh.tick = delta => {
                    dt += delta;

                    mesh.scale.set(2 + (1.3 * Math.cos(dt / 3)), 2 + (1.3 * Math.cos(dt / 3)), 1);
    
                    mesh.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;
                }
    
                meshes.push(mesh);

            });
        });

        return meshes;

    }

}
