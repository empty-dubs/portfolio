/*
Create two groups 1 and 2

Draw two sets of numLayers * numLanes polygons centered at position
    2 * (i + 1) * globalRadius * Math.cos(phi(j, numLanes)),
    2 * (i + 1) * globalRadius * Math.sin(phi(j, numLanes)),
    0

Each polygon, i, j, should be rotated according to the following rule
    poly.rotation.z += i % 2 === 0 ? 1e-1 * delta : -1e-1 * delta / 2;

Each set of polygons is added to group 1 and 2, respectively.
*/

import { Group, Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
	active: false,
	address: '/three#math_mosaic2',
	category: 'math',
	controllable: false,
	dynamic: true,
    engine: 'threeJS',
	hidden: true,
	name: 'mosaic-2',
	parameters: {
		numLayers: {
			label: 'Number of Layers',
			defaultValue: 40,
			currentValue: 40,
			maxValue: 120,
			minValue: 1
		},
		numNodes: {
			label: 'Number of Nodes',
			defaultValue: 64,
			currentValue: 64,
			maxValue: 64,
			minValue: 3
		},
		numLanes: {
			label: 'Number of Lanes',
			defaultValue: 24,
			currentValue: 24,
			maxValue: 120,
			minValue: 4
		},
		polygonRadius: {
			label: 'Polygon Radius',
			defaultValue: 1,
			currentValue: 1,
			maxValue: 20,
			minValue: 0
		},
		globalRadius: {
			label: 'Global Radius',
			defaultValue: 0.5,
			currentValue: 0.5,
			maxValue: 5,
			minValue: 0
		}
	},
	text: 'mosaic 2'
    },
    
    init() {

        const numLanes = this.metadata.parameters.numLanes.currentValue;
        const numLayers = this.metadata.parameters.numLayers.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;

        const meshes = [];

        const group1 = new Group();
        const group2 = new Group();

        const color1 = colorNodes(3);
        const color2 = colorNodes(4);

        Array.from({ length: numLayers }, (_, i) => {
            Array.from({ length: numLanes }, (_, j) => {

				const polyCenter = new Vector3(
					Math.cos(phi(j, numLanes)),
					Math.sin(phi(j, numLanes)),
					0
				).multiplyScalar(2 * (i + 1) * globalRadius);

                const poly1 = polygon(polyCenter, polygonRadius, numNodes, Math.PI / 2, color1, 'relative');

                poly1.tick = delta => {
                    poly1.rotation.z += i % 2 === 0 ? 1e-1 * delta : -1e-1 * delta / 2;
                }
                
                group1.add(poly1);

                const poly2 = polygon(polyCenter, polygonRadius, numNodes, Math.PI / 2, color2);

                poly2.tick = delta => {
                    poly2.rotation.z += i % 2 === 0 ? 1e-1 * delta : -1e-1 * delta / 2;
                }
                
                group2.add(poly2);

            });
        });

        meshes.push(group1);
        meshes.push(group2);

        return meshes;

    }

}
