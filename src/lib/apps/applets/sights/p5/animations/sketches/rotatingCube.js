let p5;

class Cube {

	constructor () {
		this.x = 1;
	}

	show () {
		p5.stroke(138, 43, 226);
		p5.box(50);
	}
}

class Animation {

	constructor(container, parameters) {
		this.container = container;
		this.parameters = parameters;

		this.cube = new Cube();
	}

	setup() {
		p5.createCanvas(this.container.clientWidth, this.container.clientHeight, p5.WEBGL).parent(this.container);
	}

	draw() {
		// draw background
		p5.background(0);

		p5.rotateX(p5.frameCount * 0.01);
		p5.rotateY(p5.frameCount * 0.01);

		this.cube.show();
	}
}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_rotating_cube',
		name: 'rotating-cube',
		engine: 'p5',
		// category: 'shapes',
		// controllable: true,
		// dynamic: false,
		hidden: true,
		resizable: true,
        parameters: {},
		text: 'Rotating Cube'
	},
	init(sketch, container) {

		p5 = sketch;

		const animation = new Animation(container, this.metadata.parameters);
		
		p5.setup = () => animation.setup();
		p5.draw = () => animation.draw();

		return p5;
	}

}
