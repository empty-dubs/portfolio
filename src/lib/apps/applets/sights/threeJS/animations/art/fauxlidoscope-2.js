/*
Draw numLayers * numLanes * numSteps transparent circles centered at position
    numSteps * i * (globalRadius / (k + 1)) * Math.sin(phi(j, numLanes)),
    numSteps * i * (globalRadius / (k + 1)) * Math.cos(phi(j, numLanes)),
    0

Each circle, i, j, k is added to a group, layerGroup, i

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

import {
    CircleGeometry,
    Group,
    MeshBasicMaterial,
    Mesh,
    Vector3
} from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_fauxlidoscope_circle',
        cameraZoomMax: 100,
        cameraZoomMin: 1,
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'fauxlidoscope-circle',
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
        text: 'fauxlidoscope circle'
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

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        function getPolyPosition(i, j, k) {
            return new Vector3(
                numSteps * i * (globalRadius / (k + 1)) * Math.sin(phi(j, numLanes)),
                numSteps * i * (globalRadius / (k + 1)) * Math.cos(phi(j, numLanes)),
                0
            );
        }

        function getMesh(i) {

            const material = new MeshBasicMaterial({
                // color: colorNodes(i),
                color,
                opacity: 4e-2,
                transparent: true,
            });
    
            return new Mesh(geometry, material);
        }

        Array.from({ length: numLayers }, (_, i) => {

            const layerGroup = new Group();

            Array.from({ length: numLanes }, (_, j) => {
                Array.from({ length: numSteps }, (_, k) => {

                    const polyPosition = getPolyPosition(i, j, k);

                    if (!polyPosition.equals(new Vector3(0, 0, 0))) {
                        const mesh = getMesh(j);

                        mesh.position.copy(getPolyPosition(i, j, k));

                        layerGroup.add(mesh)
                    }

                })
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
