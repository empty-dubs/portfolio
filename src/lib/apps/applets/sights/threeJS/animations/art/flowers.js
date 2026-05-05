import { Vector3 } from 'three';

import { Flower } from '../../templates/flower';
import { colorNodes} from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_flowers',
        category: 'art',
        controllable: true,
        dynamic: false,
        engine: 'threeJS',
        hidden: true,
        name: 'flowers',
        parameters: {
            numFlowers: {
                label: 'Number of Flowers',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 10,
                minValue: 1
            },
            numPetals: {
                label: 'Number of Petals',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 256,
                minValue: 0
            },
            numNodes: {
                label: 'Number of Nodes',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 64,
                minValue: 2
            },
            petalRadius: {
                label: 'Petal Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 5,
                minValue: 1
            }
        },
        text: 'flowers'
    },
    
    init() {

        const numFlowers = this.metadata.parameters.numFlowers.currentValue;
        const numPetals = this.metadata.parameters.numPetals.currentValue;
        const numNodes = this.metadata.parameters.numNodes.currentValue;
        const petalRadius = this.metadata.parameters.petalRadius.currentValue;

        const flowers = [];

        const root = new Vector3(0, -numFlowers, 0);
        let pistol = new Vector3(0, 0, 0);

        Array.from({ length: numFlowers}, (_, i) => {

            if (numFlowers % 2 === 0) {
                pistol.set(
                    4 * petalRadius * (i - ((numFlowers - 1) / 2)),
                    (numFlowers - 1) / 2,
                    0
                );
            } else {
                pistol.set(
                    4 * petalRadius * (i - Math.floor(numFlowers/ 2)),
                    Math.floor(numFlowers / 2),
                    0
                );
            }

            const flower = Flower(root, pistol, petalRadius, numPetals, numNodes, colorNodes(i), colorNodes(2));

            for (const group of flower) flowers.push(group);
        });

        return flowers;

    }

}
