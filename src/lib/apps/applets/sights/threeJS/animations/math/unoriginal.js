import {

    CircleGeometry,
    MeshBasicMaterial,
    Mesh


} from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#math_unoriginal',
        category: 'math',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'unoriginal',
        parameters: {
            nodeCount: {
                label: 'Number of Nodes',
                defaultValue: 24,
                currentValue: 24,
                maxValue: 1000,
                minValue: 3
            },
            nodeRadius: {
                label: 'Node Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 10,
                minValue: 0
            },
            globalRadius: {
                label: 'Global Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 0
            },
            rate: {
                label: 'Rate',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 1000,
                minValue: 0
            },
            divisor: {
                label: 'Divisor',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 20,
                minValue: 1
            }
        },
        text: 'unoriginal'
    },
    
    init() {

        const divisor = this.metadata.parameters.divisor.currentValue;
        const globalRadius = this.metadata.parameters.globalRadius.currentValue;
        const nodeCount = this.metadata.parameters.nodeCount.currentValue;
        const nodeRadius = this.metadata.parameters.nodeRadius.currentValue;
        const rate = this.metadata.parameters.rate.currentValue;

        const meshes = [];

        const geometry = new CircleGeometry(globalRadius, nodeCount);
        const material = new MeshBasicMaterial({ color: 0xffffff, wireframe: true });

        const mesh = new Mesh(geometry, material);

        // note this is required to comply with downstream behavior
        mesh.tick = () => {};

        // hide background wireframe if node count is large
        if (nodeCount > 64) mesh.visible = false;

        meshes.push(mesh);

        // create numCircles circles with slightly different radii and opacity
        Array.from({ length: nodeCount }, (_, i) => {

            const geometry = new CircleGeometry(nodeRadius / 10, 32);
            const material = new MeshBasicMaterial({ color: colorNodes(i) });

            const mesh = new Mesh(geometry, material);

            mesh.position.set(
                globalRadius * Math.cos(phi(i, nodeCount)),
                globalRadius * Math.sin(phi(i, nodeCount)),
                0
            );

            // timer
            let dt = 0;

            const n = i % (nodeCount / divisor);
            const angle = phi(i, nodeCount);
            const xPosition = globalRadius * Math.cos(angle);
            const yPosition = globalRadius * Math.sin(angle);
            const offset = n / rate;

            // on update
            mesh.tick = delta => {

                dt += delta;
                
                if (Math.floor(rate * dt) >= n) {
                    const positionScaleOffset = 1 - 2 * Math.abs(Math.sin(dt - offset));

                    mesh.position.set(
                        xPosition * positionScaleOffset,
                        yPosition * positionScaleOffset,
                        0
                    );
                }

            }

            meshes.push(mesh);

        });

        return meshes;

    }

}
