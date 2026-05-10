/*
Draw numLayers * numLanes * numSteps polygons centered at position
    numSteps * i * (globalRadius / (k + 1)) * Math.sin(phi(j, numLanes)),
    numSteps * i * (globalRadius / (k + 1)) * Math.cos(phi(j, numLanes)),
    0

Each polygon, i, j, k is added to a group, layerGroup, i

Each layer group is scaled and rotated according to the following rule
    if (i % 2 === 0) {
        layerGroup.rotateZ(2e-3 * phi(1, numNodes) * (i - Math.sin(dt)) / (i + 1));
    } else {
        layerGroup.rotateZ(-2e-3 * phi(1, numNodes) * (i - Math.sin(dt)) / (i + 1));
    }

All layer groups are added a group, concentricPolygonGroup

The parent group is scaled according to
    concentricPolygonGroup.scale.set(
        (cameraDisplacement - cameraAmplitude * Math.sin(dt)) / cameraDisplacement,
        (cameraDisplacement - cameraAmplitude * Math.sin(dt)) / cameraDisplacement,
        1
    );
*/

import { Group, Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_fauxlidoscope',
        cameraZoomMax: 100,
        cameraZoomMin: 1,
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'fauxlidoscope',
        parameters: {
            numSteps: {
                label: 'Number of Steps',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 120,
                minValue: 1
            },
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 20,
                currentValue: 20,
                maxValue: 120,
                minValue: 2
            },
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 64,
                minValue: 3
            },
            numLanes: {
                label: 'Number of Lanes',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 60,
                minValue: 2
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 64,
                minValue: 1
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 0
            }
        },
        text: 'fauxlidoscope'
    },
    
    init() {

        const numLanes = this.metadata.parameters.numLanes.currentValue;
        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numSteps = this.metadata.parameters.numSteps.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const cameraAmplitude = (this.metadata.cameraZoomMax - this.metadata.cameraZoomMin) / 2;
        const cameraDisplacement = (this.metadata.cameraZoomMax + this.metadata.cameraZoomMin) / 2;

        const meshes = [];

        const concentricPolygonGroup = new Group();

        const color = colorNodes(3);


        Array.from({ length: numLayers }, (_, i) => {

            const layerGroup = new Group();

            Array.from({ length: numLanes }, (_, j) => {
                Array.from({ length: numSteps }, (_, k) => {

                    const polyCenter = new Vector3(
                        Math.sin(phi(j, numLanes)),
                        Math.cos(phi(j, numLanes)),
                        0
                    ).multiplyScalar(numSteps * i * (globalRadius / (k + 1)));

                    const poly = polygon(polyCenter, polygonRadius / (k + 1), numNodes, Math.PI / 2, color);

                    layerGroup.add(poly);

                });
            });

            let dt = 0;

            layerGroup.tick = delta => {
                dt += 1e-1 * delta;

                if (i % 2 === 0) {
                    layerGroup.rotateZ(2e-3 * phi(1, numNodes) * (i - Math.sin(dt)) / (i + 1));
                } else {
                    layerGroup.rotateZ(-2e-3 * phi(1, numNodes) * (i - Math.sin(dt)) / (i + 1));
                }
            }

            concentricPolygonGroup.add(layerGroup);

        });

        let dt = 0;

        concentricPolygonGroup.tick = delta => {
            dt += 1e-1 * delta;

            concentricPolygonGroup.scale.set(
                (cameraDisplacement - cameraAmplitude * Math.sin(dt)) / cameraDisplacement,
                (cameraDisplacement - cameraAmplitude * Math.sin(dt)) / cameraDisplacement,
                1
            );
        }

        meshes.push(concentricPolygonGroup);

        return meshes;

    }

}
