import {

    CircleGeometry,
    MeshBasicMaterial,
    Mesh


} from 'three';

import { colorNodes } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_pinwheel',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'pinwheel',
        parameters: {
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 20,
                minValue: 1
            },
            numFaces: {
                label: 'Number of Faces',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 32,
                minValue: 3
            }
        },
        text: 'pinwheel'
    },
    
    init() {

        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const numFaces = this.metadata.parameters.numFaces.currentValue;

        const meshes = [];

        Array.from({ length: 2 * numPolygons}, (_, i) => {
            const geometry = new CircleGeometry(40 / (i + 20), numFaces);
            const material = new MeshBasicMaterial({
                color: colorNodes(2 * numPolygons - i + 1),
                // opacity: 0.3,
                // transparent: false,
                // wireframe: false
            });

            const mesh = new Mesh(geometry, material);

            let dt = 0;

            mesh.tick = (delta) => {
                dt += delta;

                mesh.rotation.z = 2 * (numPolygons - i) * dt * Math.PI * i / 160;
            }

            meshes.push(mesh);
        });

        return meshes;

    }

}
