import { Vector3 } from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_slosh_ripple',
        category: 'art',
        controllable: false,
        dynamic: true,
        hidden: false,
        name: 'slosh ripple',
        parameters: {
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 200,
                currentValue: 200,
                maxValue: 500,
                minValue: 10
            },
            radius: {
                label: 'Radius',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 10,
                minValue: 1
            }
        },
        text: 'slosh ripple'
    },
    
    init() {

        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;

        const center = new Vector3(0, 0, 0);

        const meshes = [];

        Array.from({ length: numPolygons }, (_, i) => {
            const offsetRadius = radius * (i + 1) / 10;
            
            const poly = polygon(center, offsetRadius, 100, 0, colorNodes(i));

            let dt = 0;

            poly.tick = (delta) => {
                dt += delta;

                if (i % 2 === 0) {
                    poly.scale.set(
                        1 + Math.cos(phi(i, 100) + 1e-2 * dt),
                        1 + Math.cos(phi(i, 100) + 1e-2 * dt),
                        1
                    );
                } else {
                    poly.scale.set(
                        1 + Math.sin(phi(i, 100) + 1e-2 * dt),
                        1 + Math.sin(phi(i, 100) + 1e-2 * dt),
                        1
                    );
                }
            }

            meshes.push(poly);
            
        });

        return meshes;

    }

}
