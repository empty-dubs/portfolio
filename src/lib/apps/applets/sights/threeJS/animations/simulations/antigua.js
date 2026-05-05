/*
Create numPartitions partitions of equal size
    Math.floor(numVertices / numPartitions)

Add an addition numVertices % numPartitions vertices to the graph, adding 1 to each partition

Create a graph centered at Vector3(0, 0, 0)
with graph radius graphRadius and vertex radius vertexRadius
and use a concentric layout

Update the position of each vertex, i, j,  according to
    vertexIndex = count + j;
    graph.vertexGroup.children[vertexIndex].position.add(
        new Vector3(
            1e-3 * Math.cos(phi(5e-2 * rate * dt, i + 1)),
            1e-3 * Math.sin(phi(5e-2 * rate * dt, i + 1)),
            0
        )
    );
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
        address: '/three#simulations_antigua',
        category: 'simulations',
        controllable: true,
        dynamic: true,
        engine: 'threeJS',
        hidden: false,
        name: 'antigua',
        parameters: {
            numPartitions: {
                label: 'Number of Partitions',
                defaultValue: 50,
                currentValue: 50,
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
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 0
            },
            vertexRadius: {
                label: 'Vertex Radius',
                defaultValue: 20,
                currentValue: 20,
                maxValue: 100,
                minValue: 1
            },
            rate: {
                label: 'Rate',
                defaultValue: 5,
                currentValue: 5,
                maxValue: 100,
                minValue: 1
            }
        },
        text: 'antigua'
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

        graph.initialize('concentric');

        let count = 0;

        Array.from(graph.partitionSizes, (partitionSize, i) => {

            let dt = 0;

            Array.from({ length: partitionSize}, (_, j) => {
                const vertexIndex = count + j;

                graph.vertexGroup.children[vertexIndex].tick = delta => {
                    dt += delta;

                    graph.vertexGroup.children[vertexIndex].position.add(
                        new Vector3(
                            1e-3 * Math.cos(phi(5e-2 * rate * dt, i + 1)),
                            1e-3 * Math.sin(phi(5e-2 * rate * dt, i + 1)),
                            0
                        )
                    );
                }
            });

            count += partitionSize;

        });

        return graph.vertexGroup;

    }

}
