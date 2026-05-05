import {

    CircleGeometry,
    MeshBasicMaterial,
    Mesh


} from 'three';

import { colorNodes } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_collide0scope',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'collide',
        parameters: {
            numCircles: {
                label: 'Number of Circles',
                defaultValue: 16,
                currentValue: 16,
                maxValue: 100,
                minValue: 2
            },
            numFaces: {
                label: 'Number of Faces',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 64,
                minValue: 3
            },
            radius: {
                label: 'Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 1
            }
        },
        text: 'collide0scope'
    },
    
    init() {

        const numCircles = this.metadata.parameters.numCircles.currentValue;
        const numFaces = this.metadata.parameters.numFaces.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;

        const meshes = [];

        // create numCircles circles with slightly different radii and opacity
        Array.from({ length: numCircles }, (_, i) => {
            const geometry = new CircleGeometry(radius + (i / (10 * numCircles)), numFaces);
            const material = new MeshBasicMaterial({
                color: colorNodes(i, 'cool'),
                opacity: 2e-1 - 1e-2 * i,
                transparent: true
            });

            const mesh = new Mesh(geometry, material);

            // timer
            let dt = 0;

            // on update
            mesh.tick = (delta) => {
                // increment time variable
                dt += delta;

                // rotation offset (provides wiggle)
                const offset = 3e-2 * Math.cos(i * dt / 2);

                // update mesh position
                mesh.position.z = i * 4e-1 * Math.sin(dt / 2);

                // update mesh rotation
                mesh.rotation.z += i % 2 === 0 ? delta + offset : -delta + offset;
            }

            meshes.push(mesh)
        });

        return meshes;

    }

}
