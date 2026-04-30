let p5;

function Wave(diameter) {
	this.diameter = diameter;

	this.x = p5.width / 2;
	this.y = p5.height / 2;

	this.display = () => {
		p5.stroke(255);
		p5.noFill();
		p5.ellipse(this.x, this.y, this.diameter, this.diameter);
	}

	this.animate = () => {
		this.diameter += 1;

		if (this.diameter > p5.width * 1.5) this.diameter = 0;
	}
}

class Animation {

	constructor(container, parameters) {
		this.container = container;

		this.numWaves = parameters.numWaves.currentValue;

		this.waves = [];
	}

	setup() {
		p5.createCanvas(this.container.clientWidth, this.container.clientHeight).parent(this.container);

		// add numWaves waves to the sketch
		Array.from({ length: this.numWaves}, (_, i) => {
			this.waves.push(new Wave(i * 100))
		});
	}

	draw() {
		// draw background
		p5.background(0);

		for (const wave of this.waves) {
			wave.display();
			wave.animate();
		}
	}
}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_puddle',
		name: 'puddle',
		// category: 'shapes',
		// controllable: true,
		// dynamic: false,
		hidden: true,
		resizable: true,
        parameters: {
            numWaves: {
                label: 'Number of Waves',
                defaultValue: 10,
                currentValue: 10,
                maxValue: 100,
                minValue: 0
            }
        },
		text: 'Puddle'
	},
	init(sketch, container) {

		p5 = sketch;

		const animation = new Animation(container, this.metadata.parameters);
		
		p5.setup = () => animation.setup();
		p5.draw = () => animation.draw();

		return p5;
	}

}
