import { Vector3 } from 'three';

import { offsetStar } from '../../templates/offsetStar';
import { colorNodes} from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#math_star',
        category: 'math',
        controllable: true,
        dynamic: false,
        hidden: true,
        name: 'star',
        parameters: {
            numVertices: {
                label: 'Number of Vertices',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 1000,
                minValue: 0
            },
            radius: {
                label: 'Radius',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 1000,
                minValue: 0
            },
            offset: {
                label: 'Offset',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 1000,
                minValue: 0
            }
        },
        text: 'star'
    },
    
    init() {

        const numVertices = this.metadata.parameters.numVertices.currentValue;
        const offset = this.metadata.parameters.offset.currentValue;
        const radius = this.metadata.parameters.radius.currentValue;

        const color = colorNodes(0);

        const meshes = [];

        const center = new Vector3(0, 0, 0);

        const star = offsetStar(numVertices, center, radius, 0, offset, color);

        meshes.push(star);

        return meshes;

    }

}
