import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#math_sacred_circles',
        category: 'math',
        controllable: true,
        dynamic: false,
        hidden: true,
        name: 'sacred circles',
        parameters: {
            circleRadius: {
                label: 'Circle Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 5,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 0
            },
            numCircles: {
                label: 'Number of Circles',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 64,
                minValue: 1
            },
            numLayers: {
                label: 'Number of Layers',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 64,
                minValue: 3
            },
        },
        text: 'sacred circles'
    },
    
    init() {

        const circleRadius = this.metadata.parameters.circleRadius.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const numCircles = this.metadata.parameters.numCircles.currentValue;
        const numLayers = this.metadata.parameters.numLayers.currentValue;

        const color = colorNodes(0);

        const meshes = [];

        Array.from({ length: numCircles }, (_, i) => {
            Array.from({ length: numLayers }, (_, j) => {

                const center = new Vector3(
					Math.cos(phi(i, numCircles)) + Math.sin(phi(j, numLayers)),
					Math.sin(phi(i, numCircles)) + Math.cos(phi(j, numLayers)),
					0
                ).multiplyScalar(globalRadius);

                const poly = polygon(center, circleRadius, 100, 0, color);

                meshes.push(poly);

            });
        });

        return meshes;

    }

}
