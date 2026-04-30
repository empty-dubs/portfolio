import {

    CircleGeometry,
    MeshBasicMaterial,
    Mesh,

} from 'three';

import { colorNodes } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_rainbow_grid_2',
        category: 'art',
        controllable: false,
        dynamic: true,
        hidden: false,
        name: 'rainbow-grid-2',
        parameters: {
            opacity: {
                label: 'Opacity',
                defaultValue: 50,
                currentValue: 50,
                maxValue: 100,
                minValue: 1
            },
            separator: {
                label: 'Separator',
                defaultValue: 0,
                currentValue: 0,
                maxValue: 5,
                minValue: 0
            },
        },
        text: 'rainbow grid 2'
    },
    
    init() {

        const opacity = this.metadata.parameters.opacity.currentValue;
        const separator = this.metadata.parameters.separator.currentValue;

        const numCircles = 6;
        const numColumns = 8;
        const numNodes = 4;

        const r = 1;
        const s = 1 + 1e-1 * separator;

        const meshes = [];

        const geometry = new CircleGeometry(r, numNodes);

        function getMesh(i, j) {

            const color = colorNodes(i);

            const material = new MeshBasicMaterial({
                color,
                opacity: 1e-2 * opacity,
                transparent: true,
            });
    
            const mesh = new Mesh(geometry, material);

            const posX = numColumns % 2 ? r * (s * (i - Math.floor(numColumns / 2))) : r * (s * (i - (numColumns - 1) / 2));
            const posY = numCircles % 2 ? r * (s * (j - Math.floor(numCircles / 2))) : r * (s * (j - (numCircles - 1) / 2));

            mesh.position.set(
                posX,
                posY,
                0
            );

            return mesh;
        }

        Array.from({ length: numColumns }, (_, i) => {
            Array.from({ length: numCircles }, (_, j) => {
                const mesh = getMesh(i, j);
                
                meshes.push(mesh);
            });
        });

        Array.from(meshes, (mesh, i) => {
            let dt = 0;

            mesh.tick = delta => {
                dt += 1e-2 * delta;

                mesh.scale.set(
                    Math.cos((i + 1) * dt),
                    Math.cos((i + 1) * dt),
                    1
                )

                mesh.rotateZ(5e-1 * delta);
            }
        });

        return meshes;

    }

}
