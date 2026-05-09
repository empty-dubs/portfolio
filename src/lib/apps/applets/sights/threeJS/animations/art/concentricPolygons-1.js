import {

    CircleGeometry,
    MeshBasicMaterial,
    Mesh


} from 'three';

import { colorNodes } from '../../utils/animationUtils';

export default {

    metadata: {
        active: false,
        address: '/three#art_concentric_polygons',
        category: 'art',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: true,
        name: 'concentric polygons',
        parameters: {
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 100,
                minValue: 2
            },
            numFaces: {
                label: 'Number of Faces',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 64,
                minValue: 3
            },
        },
        text: 'concentric polygons'
    },
    
    init() {

        const numPolygons = this.metadata.parameters.numPolygons.currentValue;
        const numFaces = this.metadata.parameters.numFaces.currentValue;

        const meshes = [];

        Array.from({ length: numPolygons }, (_, i) => {
            const geometry = new CircleGeometry((numPolygons - 1 - i) , numFaces);
            const material = new MeshBasicMaterial({
                color: colorNodes(numPolygons - 1 - i),
                wireframe: false
            });

            const mesh = new Mesh(geometry, material);

            let dt = 0;

            mesh.tick = (delta) => {
                dt += delta;

                mesh.rotation.z = 2 * (numPolygons - i) * Math.sin(dt / 4);
            }

            meshes.push(mesh)
        });

        return meshes;

    }

}
