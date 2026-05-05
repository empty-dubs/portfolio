/*
Create numPartitions partitions of equal size
    Math.floor(numVertices / numPartitions)

Add an addition numVertices % numPartitions vertices to the graph, adding 1 to each partition

Create a graph centered at Vector3(0, 0, 0)
with graph radius graphRadius and vertex radius vertexRadius

Update the position of each vertex, i, according to
    vertex.position.set(
        Math.cos(i),
        Math.sin(i * i),
        0
    ).multiplyScalar(graph.radius * Math.sin(1e-3 * i * rate * dt) / 2)
*/
import {
    Group,
    Vector3
} from "three";

import { Graph } from "../../templates/Graph";

export default {

    metadata: {
        active: false,
        address: '/three#simulations_amparo',
        category: 'simulations',
        controllable: false,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'amparo',
        parameters: {
            numPartitions: {
                label: 'Number of Partitions',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 100,
                minValue: 1
            },
            numVertices: {
                label: 'Number of Vertices',
                defaultValue: 1000,
                currentValue: 1000,
                maxValue: 1000,
                minValue: 100
            },
            graphRadius: {
                label: 'Graph Radius',
                defaultValue: 4,
                currentValue: 4,
                maxValue: 10,
                minValue: 0
            },
            vertexRadius: {
                label: 'Vertex Radius',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 100,
                minValue: 1
            },
            rate: {
                label: 'Rate',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 100,
                minValue: 1
            }
        },
        text: 'amparo'
    },
    
    init() {

        const numPartitions = this.metadata.parameters.numPartitions.currentValue;
        const numVertices = this.metadata.parameters.numVertices.currentValue;
        const graphRadius = this.metadata.parameters.graphRadius.currentValue;
        const vertexRadius = this.metadata.parameters.vertexRadius.currentValue;
        const rate = this.metadata.parameters.rate.currentValue;

        if (numPartitions > numVertices) {
            alert('The number of vertices must be greater than or equal to the number of partitions.');
            return new Group();
        };

        const partitionBaseSize = Math.floor(numVertices / numPartitions);
        const partitionRemainer = numVertices % numPartitions;

        const partitionSizes = Array(numPartitions).fill(partitionBaseSize);

        Array.from({ length: partitionRemainer }, (_, i) => {
            partitionSizes[i] += 1;
        });

        const graphCenter = new Vector3(0, 0, 0);

        const graph = new Graph(partitionSizes, graphCenter, graphRadius, vertexRadius);

        graph.initialize();

        Array.from(graph.vertexGroup.children, (vertex, i) => {
            let dt = 0;

            vertex.tick = delta => {
                dt += delta;

                vertex.position.set(
                    Math.cos(i),
                    Math.sin(i * i),
                    0
                ).multiplyScalar(graph.radius * Math.sin(1e-3 * i * rate * dt) / 2)
            }
        });

        return graph.vertexGroup;

    }

}
