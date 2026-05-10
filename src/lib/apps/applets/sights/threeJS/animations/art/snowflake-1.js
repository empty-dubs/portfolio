/*
Draw numLayers * numCenters sacred circle groups centered at position
    2 * (i + 1) * globalRadius * Math.cos(phi(j, numCenters)),
    2 * (i + 1) * globalRadius * Math.sin(phi(j, numCenters)),
    0

Each group, i, j, is rotated according to the following rule
    if (j % 2 === 0) {
        geom.rotateZ(rate * 1e-1 * delta);
    } else {
        geom.rotateZ(-rate * 1e-1 * delta);
    }

Each group, i, j is added to a group, layerGroup, i

All layer groups are added a group, concentricPolygonGroup
*/

import { Group, Vector3 } from 'three';

import { sacredGeometry } from '../../templates/sacredGeometry';
import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_snowflake',
        category: 'art',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'snowflake',
        parameters: {
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 12,
                minValue: 1
            },
            numCenters: {
                label: 'Number of Centers',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 64,
                minValue: 4
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 36,
                minValue: 1
            },
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 64,
                minValue: 3
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 0
            },
            rate: {
                label: 'Rate',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 0
            }
        },
        text: 'snowflake'
    },
    
    init() {

        const numCenters = this.metadata.parameters.numCenters.currentValue;
        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;
        const rate = this.metadata.parameters.rate.currentValue;

        const meshes = [];

        const parentGroup = new Group();

        const color = colorNodes(3);


        Array.from({ length: numLayers }, (_, i) => {

            const layerGroup = new Group();

            Array.from({ length: numCenters }, (_, j) => {

                const polyCenter = new Vector3(
                    Math.cos(phi(j, numCenters) + phi(1, 2 * numCenters)),
                    Math.sin(phi(j, numCenters) + phi(1, 2 * numCenters)),
                    0
                ).multiplyScalar(2 * (i + 1) * globalRadius);

                const geom = sacredGeometry(polyCenter, numPolygons, numNodes, (i + 1) * polygonRadius, (i + 1) * globalRadius, color);

                geom.tick = delta => {
                    if (j % 2 === 0) {
                        geom.rotateZ(rate * 1e-1 * delta);
                    } else {
                        geom.rotateZ(-rate * 1e-1 * delta);
                    }
                }

                layerGroup.add(geom);

            });

            parentGroup.add(layerGroup);

        });

        parentGroup.position.z -= 6;

        meshes.push(parentGroup);

        return meshes;

    }

}
