/*
Draw numPolygons polygons at position
    globalRadius * Math.cos(phi(i, numPolygons)),
    globalRadius * Math.sin(phi(i, numPolygons)),
    -3
Each circle, i, should rotate according to the following rule
    if (i % 2 === 0) {
        poly.rotateX(delta);
    } else {
        poly.rotateZ(delta);
    }
*/
import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum5',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'chrysanthemum5',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 1000,
                minValue: 0
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
        text: 'chrysanthemum 5'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        const color = colorNodes(3);

        Array.from({ length: numPolygons }, (_, i) => {
            const polyCenter = new Vector3(
                globalRadius * Math.cos(phi(i, numPolygons)),
                globalRadius * Math.sin(phi(i, numPolygons)),
                -3
            );

            const poly = polygon(polyCenter, polygonRadius, numNodes, 0, color);

            poly.tick = delta => {
                if (i % 2 === 0) {
                    poly.rotateX(delta);
                } else {
                    poly.rotateZ(delta);
                }
            }

            meshes.push(poly);
        });

        return meshes;

    }

}
