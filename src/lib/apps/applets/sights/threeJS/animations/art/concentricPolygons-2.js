import { Vector3 } from 'three';

import { polygon } from '../../utils/geomUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_concentric_polygons2',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'concentric polygons 2',
        parameters: {
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 20,
                currentValue: 20,
                maxValue: 100,
                minValue: 1
            },
            radius: {
                label: 'Radius',
                defaultValue: 5,
                currentValue: 5,
                maxValue: 20,
                minValue: 1
            }
        },
        text: 'concentric polygons 2'
    },
    
    init() {

        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;
                
        const center = new Vector3(0, 0, 0);
        const color = 0xf00a00;

        const meshes = [];

        Array.from({ length: numPolygons }, (_, i) => {
            const offsetRadius = radius * i / numPolygons;
            
            const poly = polygon(center, offsetRadius, i + 2, 0, color);

            let dt = 0;

            poly.tick = (delta) => {
                dt += delta;

                poly.rotation.z = i % 2 === 0 ? Math.sin(i) * dt / 2 : Math.sin(-i) * dt / 2;
            }

            meshes.push(poly)
        });

        return meshes;

    }

}
