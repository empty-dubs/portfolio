let p5;

class Animation {

	constructor(container, parameters) {
		this.container = container;
		this.parameters = parameters;

		this.containerWidth = this.container.clientWidth;
		this.containerHeight = this.container.clientHeight;

		this.numPoints = this.parameters.numPoints.currentValue;

		this.gfx = this.getGraphics();
		this.gfx2 = this.gfx;

	}

	getGraphics() {
		
		const gfx = p5.createGraphics(this.containerWidth, this.containerHeight);

		gfx.stroke(200);
		gfx.strokeWeight(3);

		Array.from({ length: this.numPoints }, () => {
			gfx.point(
				Math.random() * this.containerWidth,
				Math.random() * this.containerHeight
			);
		});

		return gfx;
	}

	setup() {

		p5.createCanvas(this.container.clientWidth, this.container.clientHeight).parent(this.container);

		p5.imageMode(p5.CENTER);
		p5.angleMode(p5.DEGREES);

	}

	draw() {

		// draw background
		p5.background(40);

		p5.translate(this.containerWidth / 2, this.containerHeight / 2);

		p5.image(this.gfx, 0, 0, 0);

		p5.rotate(1);

		p5.image(this.gfx2, 2, 2);

	}
}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_moire_pattern',
		name: 'moire-pattern',
		engine: 'p5',
		// category: 'shapes',
		// controllable: true,
		// dynamic: false,
		hidden: true,
		resizable: true,
        parameters: {
            numPoints: {
                label: 'Number of Points',
                defaultValue: 1000,
                currentValue: 1000,
                maxValue: 1000,
                minValue: 0
            },
		},
		text: 'Moire Pattern'
	},
	init(sketch, container) {

		p5 = sketch;

		const animation = new Animation(container, this.metadata.parameters);
		
		p5.setup = () => animation.setup();
		p5.draw = () => animation.draw();

		return p5;
	}

}
