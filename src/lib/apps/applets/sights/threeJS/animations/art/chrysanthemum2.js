/*
Draw numNodes * numNodes polygons centered at position
    globalRadius * (Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes))),
    globalRadius * (Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes))),
    0
Each circle, i, j,  should rotate according to the following rule
    poly.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;
*/
import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum2',
        category: 'art',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'chrysanthemum2',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 12,
                currentValue: 12,
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
                defaultValue: 2,
                currentValue: 2,
                maxValue: 1000,
                minValue: 0
            }
        },
        text: 'chrysanthemum 2'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        Array.from({ length: numNodes }, (_, i) => {
            const color = colorNodes(i);

            Array.from({ length: numNodes }, (_, j) => {

                const polyCenter = new Vector3(
                    Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes)),
                    Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes)),
                    0
                ).multiplyScalar(globalRadius);

                const poly = polygon(polyCenter, polygonRadius, numNodes, 0, color);

                poly.tick = delta => poly.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;
    
                meshes.push(poly);

            });
        });

        return meshes;

    }

}
