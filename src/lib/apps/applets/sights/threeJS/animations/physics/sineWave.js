import {
    BufferGeometry,
    BufferAttribute,
    LineBasicMaterial,
    Line
} from 'three';

export default {

    metadata: {
        active: false,
        address: '/three#physics_sine_wave',
        category: 'physics',
        controllable: true,
        dynamic: false,
        engine: 'threeJS',
        hidden: true,
        name: 'sine wave',
        parameters: {
            amplitude: {
                label: 'Amplitude',
                defaultValue: 0.5,
                currentValue: 0.5,
                maxValue: 1000,
                minValue: 0
            },
            frequency: {
                label: 'Frequency',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 1000,
                minValue: 0
            },
            phase: {
                label: 'Phase',
                defaultValue: 0,
                currentValue: 0,
                maxValue: 1000,
                minValue: 0
            },
            displacement: {
                label: 'Displacement',
                defaultValue: 0,
                currentValue: 0,
                maxValue: 1000,
                minValue: 0
            },
            numPoints: {
                label: 'Number of Points',
                defaultValue: 1500,
                currentValue: 1500,
                maxValue: 1000,
                minValue: 0
            }
        },
        text: 'sine wave'
    },
    
    init() {

		const node_x = [];
		const node_y = [];

        const numPoints = this.metadata.parameters.numPoints.currentValue;
        const amplitude = this.metadata.parameters.amplitude.currentValue;
        const frequency = this.metadata.parameters.frequency.currentValue;
        const phase = this.metadata.parameters.phase.currentValue;
        const displacement = this.metadata.parameters.displacement.currentValue;

        Array.from({length: 2 * numPoints + 1}, (_, i) => {
            node_x.push((i - numPoints) / 1000);
            node_y.push(amplitude * Math.sin(frequency * node_x[i] + phase) + displacement);
        })

		const vertices = new Float32Array(node_x.length * 3);

        node_x.forEach((_, i) => {
			vertices[3 * i    ] = node_x[i];
			vertices[3 * i + 1] = node_y[i];
			vertices[3 * i + 2] = 0;
        });

		const geometry = new BufferGeometry();

		geometry.setAttribute('position', new BufferAttribute(vertices, 3));

		const material = new LineBasicMaterial({ color: 0x00ffff });

		const line = new Line(geometry, material);

		return line;
    }
}
