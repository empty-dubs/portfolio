import {

    BufferGeometry,
    BufferAttribute,
    CircleGeometry,
    LineBasicMaterial,
    Line,
    Mesh,
    MeshBasicMaterial

} from 'three';

import { phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_pearl',
        category: 'art',
        controllable: true,
        dynamic: false,
        hidden: true,
        name: 'pearl',
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
        text: 'pearl'
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

		const shellGeometry = new BufferGeometry();

		shellGeometry.setAttribute('position', new BufferAttribute(vertices, 3));

		const shellMaterial = new LineBasicMaterial({ color: 0x00ffff });

		const shellLine = new Line(shellGeometry, shellMaterial);

		meshes.push(shellLine);

        Array.from({length: numRidges}, (_, i) => {
			const endpoints = new Float32Array([
                0,
                0,
                0,
                vertices[(3 * i) + 0],
                vertices[(3 * i) + 1],
                vertices[(3 * i) + 2]
            ]);

			const ridgeGeometry = new BufferGeometry();

            ridgeGeometry.setAttribute('position', new BufferAttribute(endpoints, 3));

            const ridgeMaterial = new LineBasicMaterial({ color: 0x00faff });

			const ridgeLine = new Line(ridgeGeometry, ridgeMaterial);

            meshes.push(ridgeLine);
        });

		const pearlGeometry = new CircleGeometry(radius / 10, 32);

		const pearlMaterial = new MeshBasicMaterial({ color: 0xffffff });

		const pearlMesh = new Mesh(pearlGeometry, pearlMaterial);

        pearlMesh.position.z += 1e-3;

		meshes.push(pearlMesh);

     return meshes;

    }

}
