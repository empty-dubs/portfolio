/*
Draw numPolygons * numPolygons transparent circles at position
    globalRadius * (Math.cos(phi(i, numPolygons)) + Math.cos(phi(j, numNodes))),
    globalRadius * (Math.sin(phi(i, numPolygons)) + Math.sin(phi(j, numNodes))),
    0

Each circle, i, j, is added to a group, polyGroup, and this group is translated to
    globalRadius * (Math.cos(phi(i, numPolygons)) + Math.cos(phi(j, numNodes))),
    globalRadius * (Math.sin(phi(i, numPolygons)) + Math.sin(phi(j, numNodes))),
    0

Note: this has the effect of positioning the circles at the points on a polygon offset by the radius

Rotate each polyGroup according to
    i % 2 === 0 ? polyGroup.rotateZ(delta / 2) : polyGroup.rotateZ(-delta / 2);

Add all polyGroups to a final group, parentGroup
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
        address: '/three#art_chrysanthemum7_circle3',
        category: 'art',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'chrysanthemum7-circle-3',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 8,
                currentValue: 6,
                maxValue: 1000,
                minValue: 0
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 8,
                currentValue: 12,
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
        text: 'chrysanthemum 7 circle 3'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshGroups = [];

        const parentGroup = new Group();

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        function getPosition(radius, i, j) {
            return new Vector3(
                radius * (Math.cos(phi(i, numPolygons)) + Math.cos(phi(j, numNodes))),
                radius * (Math.sin(phi(i, numPolygons)) + Math.sin(phi(j, numNodes))),
                0
            );
        }

        function getMesh(i) {

            const material = new MeshBasicMaterial({
                color: colorNodes(i % 2 + 3),
                opacity: 4e-2,
                transparent: true,
            });
    
            return new Mesh(geometry, material);
        }

        Array.from({ length: numPolygons }, (_, i) => {
            Array.from({ length: numPolygons }, (_, j) => {

                const polyGroup = new Group();
                const mesh = getMesh(i);

                mesh.position.copy(getPosition(globalRadius, i, j));

                polyGroup.add(mesh);

                polyGroup.position.copy(getPosition(globalRadius, i, j));

                polyGroup.tick = delta => i % 2 === 0 ? polyGroup.rotateZ(1e-1 * delta) : polyGroup.rotateZ(-1e-1 * delta / 2);

                parentGroup.add(polyGroup);

            });
        });

        meshGroups.push(parentGroup);

        return meshGroups;

    }

}
