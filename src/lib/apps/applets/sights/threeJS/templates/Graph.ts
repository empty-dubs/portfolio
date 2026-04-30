import {
    BufferGeometry,
    CircleGeometry,
    Group,
    Line,
    LineBasicMaterial,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    Vector3,
} from "three";

import { colorNodes, phi } from "../utils/animationUtils";
import { polygon } from "../utils/geomUtils";

export class Graph {
        partitionSizes: number[];
        center: Vector3;
        radius: number;
        vertexRadius: number;
        numVertices: number;
        numEdges: number;
        vertexGroup: Group;
        edgeGroup: Group;

    constructor (
        partitionSizes: number[],
        center: Vector3,
        radius: number,
        vertexRadius: number
    ) {

        this.partitionSizes = partitionSizes;
        this.center = center;
        this.radius = radius;
        this.vertexRadius = vertexRadius;

        this.numVertices = 0;
        this.numEdges = 0;

        this.vertexGroup = new Group();
        this.edgeGroup = new Group();

    }

    getVertexMesh(index: number, radius: number): Mesh {
        const geometry = new CircleGeometry(radius, 32);
        const material = new MeshBasicMaterial({ color: colorNodes(index) });

        return new Mesh(geometry, material);
    }

    getEdgeMesh(uVertex: Object3D, vVertex: Object3D): Line {
        const vertices = [];

        vertices.push(uVertex.position);
        vertices.push(vVertex.position);

        const geometry = new BufferGeometry().setFromPoints(vertices);

        const material = new LineBasicMaterial({ color: 0xffffff });

        return new Line(geometry, material);
    }

    createVertexSet (meshType: string, colorType: string) {

        for (const partitionSize of this.partitionSizes) {
            this.numVertices += partitionSize;
        }

        const vertexCenter = [0, 0, 0];

        if (colorType === 'sequence') {

            Array.from({ length: this.numVertices }, (_, i) => {
                let vertex = null;

                if (meshType === 'circle') {
                    vertex = this.getVertexMesh(i, this.vertexRadius / this.numVertices);
                } else if (meshType === 'polygon') {
                    vertex = polygon(vertexCenter, this.vertexRadius / this.numVertices, 32, 0, colorNodes(i));
                } else {
                    vertex = this.getVertexMesh(i, 1e-2);
                }

                this.vertexGroup.add(vertex);
            });

        } else if (colorType === 'partite') {
            Array.from(this.partitionSizes, (partitionSize, i) => {
                let vertex = null;

                if (meshType === 'circle') {
                    vertex = this.getVertexMesh(i, this.vertexRadius / this.numVertices);
                } else if (meshType === 'polygon') {
                    vertex = polygon(vertexCenter, this.vertexRadius / this.numVertices, 32, 0, colorNodes(i));
                } else {
                    vertex = this.getVertexMesh(i, 1e-2);
                }

                Array.from({ length: partitionSize}, () => {
                    const vertexClone = vertex?.clone();

                    vertexClone?.material.color.set(colorNodes(i));

                    this.vertexGroup.add(vertexClone);
                });
            });

        }

    }

    // assign coords to vertices in graph
    assignVertexCoordinates (layout: string, angle: number = 0) {

        // if only one vertex exists,
        // draw it at the origin
        if (this.numVertices === 1) {
            this.vertexGroup.children[0].position.set(0, 0, 0);
            return;
        }

        if (layout === 'polar') {
            // position each vertex about a polygon with numVertices nodes
            Array.from(this.vertexGroup.children, (vertex, i) => {
                vertex.position.copy(this.center).add(
                    new Vector3(
                        this.radius * Math.cos(phi(i, this.numVertices) + angle),
                        this.radius * Math.sin(phi(i, this.numVertices) + angle),
                        0
                    )
                );
            });

        } else if (layout === 'partite') {

            const numSides = this.partitionSizes.length;

            let count = 0;

            Array.from(this.partitionSizes, (partitionSize, i) => {
                const sideAngle = phi(i, numSides) + angle;

                let sideScale = 2 * this.radius / (partitionSize + 1);

                if (numSides > 1) {
                    sideScale *= Math.sin(Math.PI / numSides)
                }

                const spacingOffset = partitionSize % 2 === 0 ? ((1 - partitionSize) / 2) : - Math.floor(partitionSize / 2);

                Array.from({ length: partitionSize}, (_, j) => {
                    const sideSpacing = j + spacingOffset;

                    this.vertexGroup.children[count + j].position.copy(this.center).add(
                        new Vector3(
                            sideScale * sideSpacing * Math.sin(-sideAngle),
                            sideScale * sideSpacing * Math.cos(-sideAngle),
                        0
                        )
                    );

                    if (numSides > 1) {
                        this.vertexGroup.children[count + j].position.add(
                            new Vector3(
                                this.radius* Math.cos(sideAngle),
                                this.radius* Math.sin(sideAngle),
                                0
                            )
                        )
                    }
                });

                count += this.partitionSizes[i];
            });

        } else if (layout === 'concentric') {

            let count = 0;

            Array.from(this.partitionSizes, (partitionSize, i) => {

                Array.from({ length: partitionSize}, (_, j) => {
                    if (partitionSize !== 1) {
                        this.vertexGroup.children[count + j].position.copy(this.center).add(
                            new Vector3(
                                Math.cos(phi(j, partitionSize) + angle),
                                Math.sin(phi(j, partitionSize) + angle),
                                0
                            ).multiplyScalar(this.radius * (this.radius + i) / this.partitionSizes.length)
                        );
                    }
                });

                count += partitionSize;

            });

        } else if (layout === 'grid') {

            const numLevels = this.partitionSizes.length;

            let count = 0;

            Array.from(this.partitionSizes, (partitionSize, i) => {

                const levelScale = 2 * this.radius * Math.sin(Math.PI / numLevels) / (partitionSize + 1);
                const interLevelSpacing = (i - Math.floor(numLevels / 2)) / numLevels;

                Array.from({ length: partitionSize}, (_, j) => {
                    let intraLevelSpacing = 0;

                    if (partitionSize % 2 === 1) {
                        intraLevelSpacing = j - Math.floor(partitionSize / 2);
                    } else {
                        intraLevelSpacing = j + ((1 - partitionSize) / 2);
                    }

                    this.vertexGroup.children[count + j].position.set(
                        levelScale * intraLevelSpacing,
                        interLevelSpacing,
                        0
                    );
                });

                count += partitionSize;

            });

        }

    }

    addEdges (type: string): void {

        if (this.vertexGroup.children.length < 2) return;

        const n = this.numVertices;

        if (type === 'complete') {

            Array.from({ length: n - 1 }, (_, i) => {
                Array.from({ length: n - 1 }, (_, j) => {
                    const edge = this.getEdgeMesh(this.vertexGroup.children[i], this.vertexGroup.children[j + 1]);

                    this.edgeGroup.add(edge);
                });
            });

        } else if (type === 'cycle') {

            Array.from({ length: n }, (_, i) => {
                let edge = null;

                if (i < n - 1) {
                    edge = this.getEdgeMesh(this.vertexGroup.children[i], this.vertexGroup.children[i+1])
                } else {
                    edge = this.getEdgeMesh(this.vertexGroup.children[i], this.vertexGroup.children[0])
                }
                
                this.edgeGroup.add(edge);
            });

        } else if (type === 'path') {

            Array.from({ length: n - 1 }, (_, i) => {
                const edge = this.getEdgeMesh(this.vertexGroup.children[i], this.vertexGroup.children[i+1])
    
                this.edgeGroup.add(edge);
            });

        } else if (type === 'wheel') {

            Array.from({ length: n - 1 }, (_, i) => {
                const edge = this.getEdgeMesh(this.vertexGroup.children[0], this.vertexGroup.children[i+1])
    
                this.edgeGroup.add(edge);
            });

        }

        this.numEdges = this.edgeGroup.children.length;

    }

    initialize (
        layout:string = 'polar',
        angle:number = 0,
        color:string = 'partite',
        meshType:string = 'circle',
        type:string|null = null
    ) {
        this.createVertexSet(meshType, color);
        this.assignVertexCoordinates(layout, angle);

        if (type) {
            this.addEdges(type);
        }
    }

}
