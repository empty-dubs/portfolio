/*
Create numPartitions partitions of equal size
    Math.floor(numVertices / numPartitions)

Add an addition numVertices % numPartitions vertices to the graph, adding 1 to each partition

Create a graph centered at Vector3(0, 0, 0)
with graph radius graphRadius and vertex radius vertexRadius
and use a concentric layout

Update the position of each vertex, i, according to (see method below)
*/
import {
    Group,
    Vector3
} from "three";

import { Graph } from "../../templates/Graph";

export default {

    metadata: {
        active: false,
        address: '/three#simulations_look',
        category: 'simulations',
        controllable: true,
        dynamic: true,
        hidden: false,
        name: 'look',
        parameters: {
            numPartitions: {
                label: 'Number of Partitions',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 100,
                minValue: 2
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
                maxValue: 5,
                minValue: 1
            },
            vertexRadius: {
                label: 'Vertex Radius',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 100,
                minValue: 1
            },
            dampening: {
                label: 'Dampening',
                defaultValue: 10,
                currentValue: 10,
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
        text: 'look'
    },
    
    init() {

        const dampening = this.metadata.parameters.dampening.currentValue;
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

        Array.from(graph.vertexGroup.children, (vertex, i) => {
            vertex.tick = delta => {

                if (i % 4 === 0) {
                    vertex.position.multiply(
                        new Vector3(
                            1 + 1e-3 * rate * Math.sin(dampening * vertex.position.x / 10),
                            1 + 1e-3 * rate * Math.sin(dampening * vertex.position.y / 10),
                            1
                        )
                    );
                } else if (i % 4 === 1) {
                    vertex.position.multiply(
                        new Vector3(
                            1 - 1e-3 * rate * Math.sin(dampening * vertex.position.x / 10),
                            1 + 1e-3 * rate * Math.sin(dampening * vertex.position.y / 10),
                            1
                        )
                    );
                } else if (i % 4 === 2) {
                    vertex.position.multiply(
                        new Vector3(
                            1 + 1e-3 * rate * Math.sin(dampening * vertex.position.x / 10),
                            1 - 1e-3 * rate * Math.sin(dampening * vertex.position.y / 10),
                            1
                        )
                    );
                } else {
                    vertex.position.multiply(
                        new Vector3(
                            1 - 1e-3 * rate * Math.sin(dampening * vertex.position.x / 10),
                            1 - 1e-3 * rate * Math.sin(dampening * vertex.position.y / 10),
                            1
                        )
                    );
                }

            }
        });

        return graph.vertexGroup;

    }

}
