import {

    BufferGeometry,
    BufferAttribute,
    LineBasicMaterial,
    Line

} from 'three';

import { phi } from '../../utils/animationUtils';

export default {

    metadata: {
	    active: false,
        address: '/three#art_clam',
        category: 'art',
        controllable: true,
        dynamic: false,
        engine: 'threeJS',
        hidden: true,
        name: 'clam',
        parameters: {
            numRidges: {
                label: 'Number of Ridges',
                defaultValue: 64,
                currentValue: 64,
                maxValue: 1000,
                minValue: 64
            },
            radius: {
                label: 'Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 1
            }
        },
        text: 'clam'
    },
    
    init() {

        const numRidges = this.metadata.parameters.numRidges.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;

        const meshes = [];
		const vertices = new Float32Array(numRidges* 3);

		Array.from({ length: numRidges }, (_, i) => {
            const angle = phi(i, numRidges);

			vertices[3 * i    ] = radius * Math.sqrt(1 - Math.pow(Math.cos(angle), 2)) * Math.cos(angle);
			vertices[3 * i + 1] = radius * Math.sqrt(1 - Math.pow(Math.cos(angle), 2)) * Math.sin(angle);
			vertices[3 * i + 2] = 0;
        });

		const geometry = new BufferGeometry();

		geometry.setAttribute('position', new BufferAttribute(vertices, 3));

		const material = new LineBasicMaterial({ color: 0x00ffff });

		const line = new Line(geometry, material);

		meshes.push(line);


        Array.from({length: numRidges}, (_, i) => {
			const endpoints = new Float32Array([
                0,
                0,
                0,
                vertices[(3 * i) + 0],
                vertices[(3 * i) + 1],
                vertices[(3 * i) + 2]
            ]);

			const geometry = new BufferGeometry();

            geometry.setAttribute('position', new BufferAttribute(endpoints, 3));

            const material = new LineBasicMaterial({ color: 0x00faff });

			const line = new Line(geometry, material);

            meshes.push(line);
        });

     return meshes;

    }

}
