/*
Draw numCenters * numLayers * numPolygons transparent circles centered at position
    -0.1,
     0.1,
     0.0

Each circle, i, j, k should translated to the position
    j * center[0] * Math.sin(phi(k, numPolygons)) + globalRadius * Math.cos(phi(i, numCenters)),
    j * center[1] * Math.cos(phi(k, numPolygons)) + globalRadius * Math.sin(phi(i, numCenters)),
    -5

and scaled and rotated according to the following rule
    mesh.scale.set(
        1 + Math.cos((i % (numCenters * numPolygons)) * dt / 75),
        1 + Math.sin((i % (numCenters * numPolygons)) * dt / 75),
        1
    );
    mesh.rotateZ(1e-1 * delta);
*/

import {
    CircleGeometry,
    MeshBasicMaterial,
    Mesh,
    Vector3
} from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_chrysanthemum8_circle',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'chrysanthemum-8-circle',
        parameters: {
            numCenters: {
                label: 'Number of Centers',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 32,
                minValue: 2
            },
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 32,
                minValue: 2
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 32,
                minValue: 1
            },
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 8,
                minValue: 1
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 10,
                minValue: 1
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 8,
                minValue: 1
            }
        },
        text: 'chrysanthemum 8.1'
    },
    
    init() {

        const numCenters = this.metadata.parameters.numCenters.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshGroups = [];

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        const center = [-0.1, 0.1, 0];

        function getPolyPosition(j, k) {
            return new Vector3(
                j * center[0] * Math.sin(phi(k, numPolygons)),
                j * center[1] * Math.cos(phi(k, numPolygons)),
                -5
            );
        }

        function getGroupPosition(radius, i) {
            return new Vector3(
                radius * Math.cos(phi(i, numCenters)),
                radius * Math.sin(phi(i, numCenters)),
                -5
            );
        }

        function getMesh(i) {

            const material = new MeshBasicMaterial({
                color: colorNodes(i),
                opacity: 4e-2,
                transparent: true,
            });
    
            return new Mesh(geometry, material);
        }

        Array.from({ length: numCenters }, (_, i) => {
            Array.from({ length: numLayers }, (_, j) => {
                Array.from({ length: numPolygons }, (_, k) => {

                    const mesh = getMesh(j);

                    mesh.position.copy(getPolyPosition(j, k)).add(getGroupPosition(globalRadius, i));

                    meshGroups.push(mesh)

                })
            });
        });

        meshGroups.forEach((mesh, i) => {
            let dt = 0;

            mesh.tick = delta => {
                dt += 1e-2 * delta;

                mesh.scale.set(
                    1 + Math.sin((i % (numCenters * numPolygons)) * dt),
                    1 + Math.sin((i % (numCenters * numPolygons)) * dt),
                    1
                );

                mesh.rotateZ(1e-1 * delta);
            };
        });

        return meshGroups;

    }

}
