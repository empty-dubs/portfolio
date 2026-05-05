/*
Draw numNodes * numNodes * numPolygons polygons centered at position
    (globalRadius * (Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes)))) * Math.sin(phi(k, numPolygons)),
    (globalRadius * (Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes)))) * Math.cos(phi(k, numPolygons)),
    0
Each circle, i, j, k,  should rotate according to the following rule
    poly.rotation.z += i % 2 === 0 ? delta : -delta;
*/
import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'chrysanthemum',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 120,
                minValue: 4
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 16,
                currentValue: 16,
                maxValue: 120,
                minValue: 12
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 6,
                minValue: 1
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 6,
                minValue: 1
            }
        },
        text: 'chrysanthemum'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        Array.from({ length: numNodes }, (_, i) => {
            const color = colorNodes(i);

            Array.from({ length: numNodes }, (_, j) => {

                const center = new Vector3(
                    Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes)),
                    Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes)),
                    0
                ).multiplyScalar(globalRadius);

                Array.from({length: numPolygons}, (_, k) => {
                    const polyCenter = new Vector3(
                        center.x * Math.sin(phi(k, numPolygons)),
                        center.y * Math.cos(phi(k, numPolygons)),
                        0
                    );

                    const poly = polygon(polyCenter, polygonRadius, numNodes, 0, color);

                    poly.tick = delta => poly.rotation.z += i % 2 === 0 ? delta : -delta;
        
                    meshes.push(poly);
                });

            });
        });

        return meshes;

    }

}
