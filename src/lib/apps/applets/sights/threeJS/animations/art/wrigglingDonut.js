import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_wriggling_donut',
        category: 'art',
        controllable: false,
        dynamic: true,
        hidden: true,
        name: 'wriggling donut',
        parameters: {
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 40,
                currentValue: 40,
                maxValue: 1000,
                minValue: 0
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 1000,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 0.2,
                currentValue: 0.2,
                maxValue: 1000,
                minValue: 0
            },
            polygonRadius: {
                label: 'Polygon Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 1000,
                minValue: 0
            },
        },
        text: 'wriggling donut'
    },
    
    init() {

        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const polygonRadius = this.metadata.parameters.polygonRadius.currentValue;
                
        const color = colorNodes(1);

        const meshes = [];

        Array.from({ length: numNodes }, (_, i) => {
            Array.from({ length: numNodes }, (_, j) => {

				const center = new Vector3(
					Math.cos(phi(i, numNodes)) + Math.cos(phi(j, numNodes)) * Math.sin(phi(i, numPolygons)),
					Math.sin(phi(i, numNodes)) + Math.sin(phi(j, numNodes)) * Math.cos(phi(i, numPolygons)),
					0
                ).multiplyScalar(globalRadius);

                const poly = polygon(center, polygonRadius, numNodes, 0, color);

                let dt = 0;

                poly.tick = delta => {
                    dt += delta;

                    poly.rotateZ(1e-1 * (Math.sin(dt / 10) + Math.cos(dt / 10)));
                }
    
                meshes.push(poly);

            });
        });

        return meshes;

    }

}
