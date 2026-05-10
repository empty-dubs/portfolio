/*
Draw numPolygons ^ numLayers + 1 transparent circles at position
    polygonRadius * Math.cos(phi(i, numPolygons)),
    polygonRadius * Math.sin(phi(i, numPolygons)),
    0

Rotate each circle according to
    i % 2 === 0 ? mesh.rotateZ(1e-1 * delta) : mesh.rotateZ(-1e-1 * delta);

Each circle, i, is added to a group and this group is translated to
    polygonRadius * Math.cos(phi(i, numPolygons)),
    polygonRadius * Math.sin(phi(i, numPolygons)),
    0

Rotate each group according to
    i % 2 === 0 ? mesh.rotateZ(delta / 2) : mesh.rotateZ(-delta / 2);

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
        address: '/three#math_mosaic_bfs2',
        category: 'math',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'mosaic-bfs-2',
        parameters: {
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 2,
                minValue: 1
            },
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 64,
                minValue: 3
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 12,
                minValue: 3
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 50,
                minValue: 0
            }
        },
        text: 'recursive mosaic 2'
    },
    
    init() {

        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshGroups = [];

        const parentGroup = new Group();

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        function getPosition(i) {
            return new Vector3(
                polygonRadius * Math.cos(phi(i, numPolygons)),
                polygonRadius * Math.sin(phi(i, numPolygons)),
                0
            );
        }

        function getMesh() {

            const material = new MeshBasicMaterial({
                color: colorNodes(1, 'cool'),
                opacity: 1.0 / numPolygons,
                transparent: true,
            });
    
            return new Mesh(geometry, material);
        }

        function addMesh(layer, group) {

            if (layer === numLayers) return;

            Array.from({ length: numPolygons }, (_, i) => {

                const innerGroup = new Group();
    
                const mesh = getMesh();

                mesh.position.copy(getPosition(i));

                mesh.tick = delta => i % 2 === 0 ? mesh.rotateZ(1e-1 * delta) : mesh.rotateZ(-1e-1 * delta);

                innerGroup.add(mesh);

                innerGroup.position.copy(getPosition(i));

                innerGroup.tick = delta => i % 2 === 0 ? innerGroup.rotateZ(1e-1 * delta) : innerGroup.rotateZ(-1e-1 * delta);

                group.add(innerGroup);

                addMesh(layer+1, innerGroup);
                
            })

        }

        addMesh(0, parentGroup);

        meshGroups.push(parentGroup);

        return meshGroups;

    }

}
