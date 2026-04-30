import {

    CircleGeometry,
    MeshBasicMaterial,
    Mesh


} from 'three';

import { colorNodes } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_gyr0scope',
        category: 'art',
        controllable: false,
        dynamic: true,
        hidden: true,
        name: 'gyro',
        parameters: {
            numCircles: {
                label: 'Number of Circles',
                defaultValue: 3,
                currentValue: 5,
                maxValue: 100,
                minValue: 1
            },
            radius: {
                label: 'Radius',
                defaultValue: 2,
                currentValue: 1,
                maxValue: 10,
                minValue: 1
            },
            rate: {
                label: 'Rate',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 100,
                minValue: 0
            }
        },
        text: 'gyr0scope'
    },
    
    init() {

        const numCircles = this.metadata.parameters.numCircles.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;
        const rate = this.metadata.parameters.rate.currentValue;

        const meshes = [];

        // create numCircles circles with slightly different radii and opacity
        Array.from({ length: numCircles }, (_, i) => {
            const geometry = new CircleGeometry(radius + (i / (10 * numCircles)), 10);
            const material = new MeshBasicMaterial({
                color: colorNodes(i),
                opacity: 2e-1,
                transparent: true,
                // wireframe: true
            });

            const mesh = new Mesh(geometry, material);

            // timer
            let dt = 0;

            // on update
            mesh.tick = (delta) => {
                // increment time variable
                dt += delta;

                mesh.scale.set(1, Math.cos(dt / 2), i + 1);

                // rotation offset (provides wiggle)
                const offset = 1e-2 * rate * i * Math.cos(i * dt);

                // update mesh rotation
                mesh.rotation.z += i % 2 === 0 ? delta + offset : -delta + offset;
            }

            meshes.push(mesh)
        });

        return meshes;

    }

}
