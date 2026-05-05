let p5;

class Animation {

	constructor(container, parameters) {
		this.container = container;
		this.parameters = parameters;

		this.containerWidth = this.container.clientWidth;
		this.containerHeight = this.container.clientHeight;

		this.numPoints = this.parameters.numPoints.currentValue;

		this.gfx = p5.createGraphics(this.containerWidth, this.containerHeight);
		this.gfx.stroke(0);
		this.gfx.strokeWeight(2);
	}

	setup() {
		p5.createCanvas(this.container.clientWidth, this.container.clientHeight).parent(this.container);
		
		p5.translate(this.containerWidth / 2, this.containerHeight / 2);

		// draw background
		p5.background(40);
	}

	draw() {

		Array.from({ length: this.numPoints }, () => {
			this.gfx.point(
				Math.random() * this.containerWidth,
				Math.random() * this.containerHeight
			);
		});

		p5.image(this.gfx, 0, 0);

	}
}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_random_points',
		name: 'random-points',
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
		text: 'Random Points'
	},
	init(sketch, container) {

		p5 = sketch;

		const animation = new Animation(container, this.metadata.parameters);
		
		p5.setup = () => animation.setup();
		p5.draw = () => animation.draw();

		return p5;
	}

}
