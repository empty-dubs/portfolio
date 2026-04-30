/*
NOTE: this is the same as chrysanthemum but with scaling

Draw numNodes * numNodes * numPolygons polygons centered at position
    (globalRadius * (Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes)))) * Math.sin(phi(k, numPolygons)),
    (globalRadius * (Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes)))) * Math.cos(phi(k, numPolygons)),
    0
Each circle, i, j, k,  should scale and rotate according to the following rule
    poly.scale.set(2 + (1.3 * Math.cos(dt / 3)), 2 + (1.3 * Math.cos(dt / 3)), 1);
    poly.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;
*/
import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum4',
        category: 'art',
        controllable: false,
        dynamic: true,
        hidden: true,
        name: 'chrysanthemum4',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 1000,
                minValue: 0
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 1000,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 1000,
                minValue: 0
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 1000,
                minValue: 0
            }
        },
        text: 'chrysanthemum 4'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        const color = colorNodes(3);

        Array.from({ length: numNodes }, (_, i) => {
            Array.from({ length: numNodes }, (_, j) => {

                const polyClusterCenter = new Vector3(
                    Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes)),
                    Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes)),
                    0
                ).multiplyScalar(globalRadius);


                Array.from({ length: numPolygons}, (_, k) => {
                    const polyCenter = new Vector3(
                        polyClusterCenter.x * Math.sin(phi(k, numPolygons)),
                        polyClusterCenter.y * Math.cos(phi(k, numPolygons)),
                        0
                    );

                    const poly = polygon(polyCenter, polygonRadius, numNodes, 0, color);
    
                    let dt = 0;

                    poly.tick = delta => {
                        dt += delta;

                        poly.scale.set(2 + (1.3 * Math.cos(dt / 3)), 2 + (1.3 * Math.cos(dt / 3)), 1);
        
                        poly.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;
                    }
        
                    meshes.push(poly);
                })

            });
        });

        return meshes;

    }

}
