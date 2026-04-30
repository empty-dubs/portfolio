/*
Draw numLayers ^ numCenters groups positioned at
    globalRadius * Math.cos(phi(i, numPolygons)),
    globalRadius * Math.sin(phi(i, numPolygons)),
    0

Each circle, i, has radius polygonRadius / (i + 1)
and is added to a group, innerGroup, and this group is translated to
    polygonRadius * Math.cos(phi(i, numPolygons)),
    polygonRadius * Math.sin(phi(i, numPolygons)),
    0
and rotated
    innerGroup.tick = delta => i % 2 === 0 ? innerGroup.rotateZ(rate * 1e-1 * delta) : innerGroup.rotateZ(-rate * 1e-1 * delta);

If numNodes <= 12, rotate each circle according to
    i % 2 === 0 ? mesh.rotateZ(1e-1 * delta) : mesh.rotateZ(-1e-1 * delta);

Add all innerGroups to a final group, parentGroup
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
        address: '/three#art_snowflake_bfs',
        category: 'art',
        controllable: true,
        dynamic: true,
        hidden: false,
        name: 'snowflake-bfs',
        parameters: {
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 12,
                minValue: 1
            },
            numCenters: {
                label: 'Number of Centers',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 12,
                minValue: 0
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
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 100,
                minValue: 0
            },
            rate: {
                label: 'Rate',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 100,
                minValue: 0
            },
            opacity: {
                label: 'Opacity',
                defaultValue: 25,
                currentValue: 25,
                maxValue: 50,
                minValue: 1
            },
        },
        text: 'snowflake bfs'
    },
    
    init() {

        const numCenters = this.metadata.parameters.numCenters.currentValue;
        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;
        const opacity = this.metadata.parameters.opacity.currentValue;
        const rate = this.metadata.parameters.rate.currentValue;

        if (Math.pow(numLayers, numCenters) > 10000) {
            alert('Too many polygons. Adjust layer count or center count.');
            return new Group();
        };

        const meshGroups = [];

        const parentGroup = new Group();

        function getPosition(radius, i) {
            return new Vector3(
                radius * Math.cos(phi(i, numCenters)),
                radius * Math.sin(phi(i, numCenters)),
                0
            );
        }

        function getMesh(i) {

            const geometry = new CircleGeometry(polygonRadius / (i + 1), numNodes);

            const material = new MeshBasicMaterial({
                color: colorNodes(0, 'cool'),
                opacity: opacity / 100,
                transparent: true,
            });
    
            return new Mesh(geometry, material);
        }

        function addMesh(layer, group) {

            if (layer === numLayers) return;

            Array.from({ length: numCenters }, (_, i) => {

                const innerGroup = new Group();

                if (numLayers - layer === 1) {
                    const mesh = getMesh(layer);

                    mesh.position.copy(getPosition(polygonRadius / (layer + 1), i));

                    if (numNodes <= 12) {
                        mesh.tick = delta => i % 2 === 0 ? mesh.rotateZ(rate * 1e-1 * delta) : mesh.rotateZ(-rate * 1e-1 * delta);
                    }

                    innerGroup.add(mesh);
                }

                innerGroup.position.copy(getPosition(globalRadius, i));

                innerGroup.tick = delta => i % 2 === 0 ? innerGroup.rotateZ(rate * 1e-1 * delta) : innerGroup.rotateZ(-rate * 1e-1 * delta);

                group.add(innerGroup);

                addMesh(layer+1, innerGroup);
                
            })

        }

        addMesh(0, parentGroup);

        parentGroup.position.z -= 2;

        meshGroups.push(parentGroup);

        return meshGroups;

    }

}
