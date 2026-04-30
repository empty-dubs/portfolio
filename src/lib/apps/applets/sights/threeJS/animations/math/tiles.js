/*
Recursively draw sum n^(numLayers - 1) where n in [1, numCenters] polygons
*/

import { Group, Vector3 } from 'three';

import { polygon } from '../../utils/geomUtils';
import { colorNodes, phi } from '../../utils/animationUtils';

function recursiveDraw (group, mesh, numCenters, tol) {

  if (tol > 0) {

    group.add(mesh.clone());

    let meshCopy = mesh.clone();

    meshCopy.rotateZ(Math.pow(-1, tol) * Math.PI / numCenters);

    for (let i = 0; i < numCenters; ++i) {

      meshCopy.position.set(
        mesh.position.x + mesh.scale.x * Math.cos(phi(4 * i + 1, 4 * numCenters)),
        mesh.position.y + mesh.scale.y * Math.sin(phi(4 * i + 1, 4 * numCenters)),
        mesh.position.z
      );

      recursiveDraw(group, meshCopy, numCenters, tol - 1);

    }

  }

}

export default {

    metadata: {
        active: false,
        address: '/three#math_tiles',
        category: 'math',
        controllable: true,
        dynamic: false,
        hidden: true,
        name: 'tiles',
        parameters: {
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 9,
                minValue: 1
            },
            numNodes: {
                label: 'Number of Vertices',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 64,
                minValue: 0
            },
            numCenters: {
                label: 'Number of Centers',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 100,
                minValue: 0
            },
            radius: {
                label: 'Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 0
            }
        },
        text: 'tiles'
    },
    
    init() {

        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numCenters = this.metadata.parameters.numCenters.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;

        if (Math.pow(numCenters, numLayers - 1) > 10000) {
            alert('Too many polygons. Adjust layer count or center count.');
            return new Group();
        };

        const meshes = [];

        const tileGroup = new Group();

        const center = new Vector3(0, 0, 0);
        const color = colorNodes(1);

        let tile = polygon(center, radius, numNodes, 0, color);

        tile.scale.multiplyScalar(radius);

        recursiveDraw(tileGroup, tile, numCenters, numLayers)

        meshes.push(tileGroup);

        return meshes;

    }

}
