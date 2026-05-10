/*
Draw numPolygons * numPolygons polygons centered at position
    globalRadius * (Math.cos(phi(i, numPolygons)) + Math.cos(phi(j, numNodes))),
    globalRadius * (Math.sin(phi(i, numPolygons)) + Math.sin(phi(j, numNodes))),
    0
Each polygon, i, j, should translated to the position defined above
and rotated according to the following rule
    poly.rotation.z += i % 2 === 0 ? delta / 10 : -delta / 20;
*/
import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum7',
        category: 'art',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'chrysanthemum7',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 64,
                minValue: 3
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 12,
                minValue: 1
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
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 1
            }
        },
        text: 'chrysanthemum 7'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        const color = colorNodes(3);

        Array.from({ length: numPolygons }, (_, i) => {
            Array.from({ length: numPolygons }, (_, j) => {

                const polyCenter = new Vector3(
                    Math.cos(phi(i, numPolygons)) + Math.cos(phi(j, numPolygons)),
                    Math.sin(phi(i, numPolygons)) + Math.sin(phi(j, numPolygons)),
                    0
                ).multiplyScalar(globalRadius);

                const poly = polygon(polyCenter, polygonRadius, numNodes, 0, color, 'relative');

                poly.tick = delta => {
                    poly.rotation.z += i % 2 === 0 ? delta / 10 : -delta / 20;
                }
    
                meshes.push(poly);

            });
        });

        return meshes;

    }

}
