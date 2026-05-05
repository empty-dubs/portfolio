/*
Create numPartitions partitions of equal size
    Math.floor(numVertices / numPartitions)

Add an addition numVertices % numPartitions vertices to the graph, adding 1 to each partition

Create a graph centered at Vector3(0, 0, 0)
with graph radius graphRadius and vertex radius vertexRadius

Update the position of each vertex, i,  according to
    vertex.position.set(
        Math.cos(phi(i, numVertices)) + Math.sin(dt) * Math.sin(rate * i * dt),
        Math.sin(phi(i, numVertices)) * Math.cos(rate * (i - 1) * dt),
        0
    ).multiplyScalar(graphRadius);
*/
import {
    Group,
    Vector3
} from "three";

import { Graph } from "../../templates/Graph";
import { phi } from "../../utils/animationUtils";

export default {

    metadata: {
        active: false,
        address: '/three#simulations_tereza',
        category: 'simulations',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'tereza',
        parameters: {
            numPartitions: {
                label: 'Number of Partitions',
                defaultValue: 8,
                currentValue: 8,
                maxValue: 100,
                minValue: 1
            },
            numVertices: {
                label: 'Number of Vertices',
                defaultValue: 200,
                currentValue: 200,
                maxValue: 1000,
                minValue: 100
            },
            graphRadius: {
                label: 'Graph Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 5,
                minValue: 0
            },
            vertexRadius: {
                label: 'Vertex Radius',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 100,
                minValue: 1
            },
            rate: {
                label: 'Rate',
                defaultValue: 1,
                currentValue: 1,
                maxValue: 100,
                minValue: 1
            }
        },
        text: 'tereza'
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
                dt += delta / 10;

                vertex.position.set(
                    Math.cos(phi(i, numVertices)) + Math.sin(dt) * Math.sin(rate * i * dt),
                    Math.sin(phi(i, numVertices)) * Math.cos(rate * (i - 1) * dt),
                    0
                ).multiplyScalar(graphRadius);
            }
        });

        return graph.vertexGroup;

    }

}
