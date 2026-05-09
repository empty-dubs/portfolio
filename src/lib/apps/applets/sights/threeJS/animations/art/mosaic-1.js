/*
Draw numPolygons * numPolygons * numLayers * numPolygons polygons centered at position
    k * (globalRadius * Math.cos(phi(i, numPolygons)) + polygonRadius * Math.cos(phi(j, numPolygons))) * Math.sin(phi(l, numPolygons)),
    k * (globalRadius * Math.sin(phi(i, numPolygons)) + polygonRadius * Math.sin(phi(j, numPolygons))) * Math.cos(phi(l, numPolygons)),
    0
Each polygon, i, j, k, l, should translated to the position defined above
and rotated according to the following rule
    poly.rotation.z += i % 2 === 0 ? delta / 10 : -delta / 20;
*/

import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#math_mosaic',
        category: 'math',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'mosaic',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 8,
                currentValue: 8,
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
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 100,
                minValue: 1
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 50,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 50,
                minValue: 0
            }
        },
        text: 'mosaic'
    },
    
    init() {

        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        Array.from({ length: numPolygons }, (_, i) => {

            const color = colorNodes(i, 'cool');

            const polyClusterCenter = new Vector3(
                Math.cos(phi(i, numPolygons)),
                Math.sin(phi(i, numPolygons)),
                0
            ).multiplyScalar(globalRadius);

            Array.from({ length: numPolygons }, (_, j) => {

                const polyCenterOffset = new Vector3(
                    Math.cos(phi(j, numPolygons)),
                    Math.sin(phi(j, numPolygons)),
                    0
                ).multiplyScalar(polygonRadius);

                Array.from({ length: numLayers }, (_, k) => {

                    Array.from({ length: numPolygons }, (_, l) => {
                        const polyCenter = new Vector3(
                            (polyClusterCenter.x + polyCenterOffset.x) * Math.cos(phi(l, numPolygons)),
                            (polyClusterCenter.y + polyCenterOffset.y) * Math.sin(phi(l, numPolygons)),
                            0
                        ).multiplyScalar(k);

                        const poly = polygon(polyCenter, polygonRadius, numNodes, 0, color, 'relative');

                        poly.tick = delta => {
                            poly.rotation.z += i % 2 === 0 ? delta / 10 : -delta / 20;
                        }
            
                        meshes.push(poly);
                    });

                });

            });
        });

        return meshes;

    }

}
