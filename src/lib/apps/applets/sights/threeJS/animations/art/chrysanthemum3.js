/*
Draw numPolygons * (numPolygons + 1) / 2 transparent circles at position
    radius * Math.cos(phi(i, numPolygons)),
    radius * Math.sin(phi(i, numPolygons)),
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
        address: '/three#art_chrysanthemum3',
        category: 'art',
        controllable: false,
        dynamic: true,
        hidden: true,
        name: 'chrysanthemum3',
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
                defaultValue: 12,
                currentValue: 12,
                maxValue: 1000,
                minValue: 0
            },
            radius: {
                label: 'Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 1
            }
        },
        text: 'chrysanthemum 3'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;

        const meshes = [];

        Array.from({ length: numPolygons }, (_, i) => {
            Array.from({ length: i }, (_, j) => {

                const color = colorNodes(i * j);

                const polyCenter = new Vector3(
                    Math.cos(phi(i, numPolygons)),
                    Math.sin(phi(i, numPolygons)),
                    0
                ).multiplyScalar(radius);

                const poly = polygon(polyCenter, radius, numNodes, 0, color);

                poly.tick = delta => poly.rotation.z += i % 2 === 0 ? delta / 2 : -delta / 2;
    
                meshes.push(poly);

            });
        });

        return meshes;

    }

}
