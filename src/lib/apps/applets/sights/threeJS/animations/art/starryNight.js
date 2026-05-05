import { Vector3 } from 'three';

import { Star } from '../../templates/Star';
import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_starry_night',
        category: 'art',
        controllable: true,
        dynamic: false,
        engine: 'threeJS',
        hidden: true,
        name: 'starry night',
        parameters: {
            numStars: {
                label: 'Number of Stars',
                defaultValue: 42,
                currentValue: 42,
                maxValue: 1000,
                minValue: 1
            },
            numStems: {
                label: 'Number of Stems',
                defaultValue: 12,
                currentValue: 12,
                maxValue: 64,
                minValue: 2
            },
            numSplits: {
                label: 'Number of Splits',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 8,
                minValue: 1
            },
            radius: {
                label: 'Radius',
                defaultValue: 42,
                currentValue: 42,
                maxValue: 1000,
                minValue: 1
            }
        },
        text: 'starry night'
    },
    
    init() {

        const numStars = this.metadata.parameters.numStars.currentValue;
        const numStems = this.metadata.parameters.numStems.currentValue;
        const numSplits = this.metadata.parameters.numSplits.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;

        const stars = [];

        Array.from({ length: numStars}, (_, i) => {

            const starCenter = new Vector3(
                (Math.random() - 1) * Math.cos(phi(i, numStars)),
                (Math.random() - 1) * Math.sin(phi(i, numStars)),
                (Math.random() - 1),
            ).multiplyScalar(radius);

            const starRadius = Math.abs(Math.random() - 0.5);

            const star = Star(starCenter, numStems, numSplits, starRadius, colorNodes(i, 'hot'));

            for (const group of star) stars.push(group);
        });

        return stars;

    }

}
