/*
Draw numCenters * numLayers * numPolygons polygons centered at position
    -0.1,
     0.1,
     0.0

Each polygon, i, j, k should translated to the position
    j * center[0] * Math.sin(phi(k, numPolygons)) + globalRadius * Math.cos(phi(i, numCenters)),
    j * center[1] * Math.cos(phi(k, numPolygons)) + globalRadius * Math.sin(phi(i, numCenters)),
    -5

and scaled and rotated according to the following rule
    poly.scale.set(
        1 + Math.sin((i % (numCenters * numPolygons)) * dt / 75),
        1 + Math.sin((i % (numCenters * numPolygons)) * dt / 75),
        1
    );
    poly.rotateZ(1e-1 * delta);
*/
import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum8',
        category: 'art',
        controllable: false,
        dynamic: true,
        hidden: false,
        name: 'chrysanthemum-8',
        parameters: {
            numCenters: {
                label: 'Number of Centers',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 32,
                minValue: 2
            },
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 5,
                currentValue: 5,
                maxValue: 32,
                minValue: 2
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 20,
                currentValue: 20,
                maxValue: 32,
                minValue: 1
            },
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 8,
                minValue: 1
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 1
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 8,
                minValue: 1
            }
        },
        text: 'chrysanthemum 8'
    },
    
    init() {

        const numCenters = this.metadata.parameters.numCenters.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        const center = new Vector3(-0.1, 0.1, 0);

        Array.from({ length: numCenters }, (_, i) => {

            const polyOffsetCenter = new Vector3(
                Math.cos(phi(i, numCenters)),
                Math.sin(phi(i, numCenters)),
                0
            ).multiplyScalar(globalRadius);

            Array.from({ length: numLayers }, (_, j) => {

                const polyClusterCenter = center.clone().multiplyScalar(j);

                Array.from({ length: numPolygons }, (_, k) => {

                    const polyCenter = new Vector3(
                        polyClusterCenter.x * Math.sin(phi(k, numPolygons)) + polyOffsetCenter.x,
                        polyClusterCenter.y * Math.cos(phi(k, numPolygons)) + polyOffsetCenter.y,
                        -5                        
                    );

                    const poly = polygon(polyCenter, polygonRadius, numNodes, 0, colorNodes(j));

                    meshes.push(poly);
                });


            });
        });

        meshes.forEach((mesh, i) => {
            let dt = 0;

            mesh.tick = delta => {
                dt += delta / 75;

                mesh.scale.set(
                    1 + Math.sin((i % (numCenters * numPolygons)) * dt),
                    1 + Math.sin((i % (numCenters * numPolygons)) * dt),
                    1
                );
                mesh.rotateZ(1e-1 * delta);
            }
        });

        return meshes;

    }

}
