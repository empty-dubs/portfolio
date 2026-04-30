/*
Create numPartitions partitions of equal size
    Math.floor(numVertices / numPartitions)

Add an addition numVertices % numPartitions vertices to the graph, adding 1 to each partition

Create a graph centered at Vector3(0, 0, 0)
with graph radius graphRadius and vertex radius vertexRadius
and use a concentric layout

Update the position of each vertex, i,  according to
    vertex.position.set(
        Math.sin(phi(i, numVertices)),
        Math.cos(phi(i, numVertices)),
        0
    )
    .multiplyScalar(Math.cos(rate * i * dt / 1e3))
    .multiplyScalar(graphRadius);
*/

import { Group, Vector3 } from "three";
import { Graph } from "../../templates/Graph";
import { phi } from "../../utils/animationUtils";

export default {

    metadata: {
        active: false,
        address: '/three#simulations_graph_test',
        category: 'simulations',
        controllable: true,
        dynamic: true,
        hidden: true,
        name: 'graph-test',
        parameters: {
            numPartitions: {
                label: 'Number of Partitions',
                defaultValue: 6,
                currentValue: 6,
                maxValue: 100,
                minValue: 1
            },
            numVertices: {
                label: 'Number of Vertices',
                defaultValue: 20,
                currentValue: 20,
                maxValue: 1000,
                minValue: 1
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
                defaultValue: 2,
                currentValue: 2,
                maxValue: 100,
                minValue: 1
            },
            rate: {
                label: 'Rate',
                defaultValue: 20,
                currentValue: 20,
                maxValue: 100,
                minValue: 1
            }
        },
        text: 'graph test'
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

        const graphGroup = new Group();
        const graphCenter = new Vector3(0, 0, 0);

        const graph = new Graph(partitionSizes, graphCenter, graphRadius, vertexRadius);

        graph.initialize('partite', 0, 'partite', 'circle', 'complete');

        // Array.from(graph.vertexGroup.children, (vertex, i) => {
        //     let dt = 0;

        //     vertex.tick = delta => {
        //         dt += delta;

        //         vertex.position.set(
        //             Math.sin(phi(i, numVertices)),
        //             Math.cos(phi(i, numVertices)),
        //             0
        //         )
        //         .multiplyScalar(Math.cos(rate * i * dt / 1e3))
        //         .multiplyScalar(graphRadius);
        //     }
        // });

        graphGroup.add(graph.edgeGroup);
        graphGroup.add(graph.vertexGroup);

        return graphGroup;

    }

}
