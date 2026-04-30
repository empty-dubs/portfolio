let p5;

class Vertex {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class RegularPolygon {

	constructor(x, y, radius, numVertices, offset=0) {
		this.numVertices = numVertices;
		this.offset = offset;
		this.radius = radius;
		this.x = x;
		this.y = y;

		this.theta = p5.TWO_PI / numVertices;

		this.vertices = [];
	}

	show() {
		p5.stroke(255);
		p5.noFill();

		p5.beginShape();
		
		Array.from({ length: this.numVertices }, () => {
			const  sx = this.x + p5.cos(this.theta + this.offset) * this.radius;
			const  sy = this.y + p5.sin(this.theta + this.offset) * this.radius;

			this.vertices.push(new Vertex(sx, sy));

			p5.vertex(sx, sy);

			this.theta += p5.TWO_PI / this.numVertices;
		});

		p5.endShape(p5.CLOSE);
	}
}

class VertexFigure {

	constructor(p, q, r, x = 0 , y = 0) {
		this.numVertices = p;
		this.numPolygons = q;
		this.radius = r;
		this.x = x;
		this.y = y;

		this.outerVertices = [];
		this.polygons = [];
	}

	show() {

		Array.from({ length: this.numPolygons}, (_, i) => {
			const  x = this.x + this.radius * p5.cos(((2 * i) + 1) * p5.PI / this.numPolygons);
			const  y = this.y + this.radius * p5.sin(((2 * i) + 1) * p5.PI / this.numPolygons);

			this.polygons.push(new RegularPolygon(x, y, this.radius, this.numVertices, p5.pow(-1, i + 1) * p5.PI / this.numPolygons));

			this.polygons[i].show();

			this.outerVertices.push(this.polygons[i].vertices[p5.floor(i / 2)]);
		});
	}
}

class Tessellation {

	constructor(type, numVertices, numPolygons, radius, depth) {
		this.depth = depth;
		this.numPolygons = numPolygons;
		this.numVertices = numVertices;
		this.radius = radius;
		this.type = type;
	}

	exploreOuterVertices(figures) {
		const neighbors = [];

		for (const figure of figures) {
			figure.show();

			for (const vertex of figure.outerVertices) {
				neighbors.push(new VertexFigure(this.numVertices, this.numPolygons, this.radius, vertex.x, vertex.y));
			}
		}

		return neighbors;
	}

	show() {

		let figures = [new VertexFigure(this.numVertices, this.numPolygons, this.radius)];
		let visited = [new VertexFigure(this.numVertices, this.numPolygons, this.radius)];

		let i = 0;

		while (i < this.depth) {
			const neighbors = this.exploreOuterVertices(figures);

			figures = [];

			for (const neighbor of neighbors) {
				// neighbor.show();
				if (!visited.includes(neighbor)) {
					figures.push(neighbor);
					visited.push(neighbor);
				}
			}

			/* eslint-disable */
			i += 1;
		}

		for (const polygon of visited) {
			polygon.show()
		};

	}
}

class Animation {

	constructor(container, parameters) {
		this.container = container;
		this.parameters = parameters;

		this.containerWidth = this.container.clientWidth;
		this.containerHeight = this.container.clientHeight;

		this.depth = parameters.depth.currentValue;
		this.numVertices = parameters.numVertices.currentValue;
		this.numPolygons = parameters.numPolygons.currentValue;
		this.radius = parameters.radius.currentValue;

		this.tessellation = new Tessellation('triangular', this.numVertices, this.numPolygons, this.radius, this.depth);
	}

	setup() {

		p5.createCanvas(this.container.clientWidth, this.container.clientHeight).parent(this.container);
		
		p5.noLoop();

	}

	draw() {

		// draw background
		p5.background(40);

		this.tessellation.show();

	}
}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_tiles',
		name: 'tiles',
		// category: 'shapes',
		// controllable: true,
		// dynamic: false,
		hidden: true,
		resizable: true,
        parameters: {
            depth: {
                label: 'Depth',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 10,
                minValue: 1
            },
            numVertices: {
                label: 'Number of Vertices',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 6,
                minValue: 3
            },
            numPolygons: {
                label: 'Number of Polygons',
                defaultValue: 3,
                currentValue: 3,
                maxValue: 6,
                minValue: 3
            },
            radius: {
                label: 'Polygon Radius',
                defaultValue: 50,
                currentValue: 50,
                maxValue: 100,
                minValue: 0
            }
		},
		text: 'Tiles'
	},
	init(sketch, container) {

		p5 = sketch;

		const animation = new Animation(container, this.metadata.parameters);
		
		p5.setup = () => animation.setup();
		p5.draw = () => animation.draw();

		return p5;
	}

}
