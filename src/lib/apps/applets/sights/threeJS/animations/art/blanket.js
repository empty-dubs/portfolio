import {
    CircleGeometry,
    MeshBasicMaterial,
    Mesh
} from 'three';

import { colorNodes, phi } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three_conversion#art_blanket',
        category: 'art',
        controllable: false,
        dynamic: false,
        hidden: true,
        name: 'blanket',
        parameters: {
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 1000,
                minValue: 1
            },
            numFaces: {
                label: 'Number of Faces',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 500,
                minValue: 3
            }
        },
        text: 'blanket'
    },
    
    init() {

        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const numFaces = this.metadata.parameters.numFaces.currentValue;

        const meshes = [];

        Array.from({ length: 2 * numPolygons}, (_, i) => {
            const geometry = new CircleGeometry(10 / (i + 1), numFaces);
            const material = new MeshBasicMaterial({ color: colorNodes(2 * numPolygons - i), wireframe: false });

            const mesh = new Mesh(geometry, material);

            mesh.rotateZ(phi(i, 8));

            meshes.push(mesh);
        });

        return meshes;

    }

}
