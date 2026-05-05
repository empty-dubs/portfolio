import { Vector3 } from 'three';

import { phi } from '../../utils/animationUtils';
import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_bounce_ripple',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'bounce ripple',
        parameters: {
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 100,
                minValue: 1
            },
            radius: {
                label: 'Radius',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 6,
                minValue: 1
            }
        },
        text: 'bounce ripple'
    },
    
    init() {

        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;

        const center = new Vector3(0, 0, 0);
        const color = 0xf00a00;

        const meshes = [];

        Array.from({ length: numPolygons }, (_, i) => {
            const offsetRadius = radius * (i + 1) / numPolygons;
            
            const poly = polygon(center, offsetRadius, 100, 0, color);

            let dt = 0;

            poly.tick = (delta) => {
                dt += delta;

                poly.scale.set(
                    Math.cos(dt) * Math.sin(phi(i, 100) + 2 * dt),
                    Math.cos(dt) * Math.sin(phi(i, 100) + 2 * dt),
                    1
                )
            }

            meshes.push(poly)
        });

        return meshes;

    }

}
