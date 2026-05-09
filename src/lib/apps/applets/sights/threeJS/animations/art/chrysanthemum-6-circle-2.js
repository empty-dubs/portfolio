/*
Draw numPolygons transparent circles at position
    globalRadius * Math.cos(phi(i, numPolygons)),
    globalRadius * Math.sin(phi(i, numPolygons)),
    0

Each circle, i, is added to a group, polyGroup, and this group is translated to
    globalRadius * Math.cos(phi(i, numPolygons)),
    globalRadius * Math.sin(phi(i, numPolygons)),
    0

Note: this has the effect of positioning the circles at the points on a polygon offset by the radius

Rotate each polyGroup according to
    i % 2 === 0 ? polyGroup.rotateZ(delta / 2) : polyGroup.rotateZ(-delta / 2);

Add all polyGroups to a final group, parentGroup

Translate and rotate the parentGroup using
    parentGroup.position.z -= 3;
    parentGroup.rotation.z += 90;
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
        address: '/three#art_chrysanthemum6_circle2',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'chrysanthemum6-circle-2',
        parameters: {
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
                maxValue: 1000,
                minValue: 0
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
                maxValue: 10,
                minValue: 0
            }
        },
        text: 'chrysanthemum 6 circle 2'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshGroups = [];

        const parentGroup = new Group();

        const geometry = new CircleGeometry(polygonRadius, numNodes);

        function getPosition(radius, i) {
            return new Vector3(
                radius * Math.cos(phi(i, numPolygons)),
                radius * Math.sin(phi(i, numPolygons)),
                0
            );
        }

        function getMesh(i) {

            const material = new MeshBasicMaterial({
                color: colorNodes(i),
                opacity: 2e-1,
                transparent: true,
            });

            return new Mesh(geometry, material);
        }

        Array.from({ length: numPolygons}, (_, i) => {
            const polyGroup = new Group();

            const mesh = getMesh(i);

            mesh.position.copy(getPosition(globalRadius, i))

            polyGroup.add(mesh);

            polyGroup.position.copy(getPosition(globalRadius, i))
            
            polyGroup.tick = delta => i % 2 === 0 ? polyGroup.rotateZ(delta / 2) : polyGroup.rotateZ(-delta / 2);

            parentGroup.add(polyGroup);
        });

        parentGroup.position.z -= 3;
        parentGroup.rotation.z += 90;

        meshGroups.push(parentGroup);

        return meshGroups;

    }

}
