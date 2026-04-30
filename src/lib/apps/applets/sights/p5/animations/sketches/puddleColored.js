let p5;

function Wave(a, b) {
	this.a = a;
	this.b = b;

	this.x = p5.width / 2;
	this.y = p5.height / 2;

	this.colorR = p5.random(255);
	this.colorG = p5.random(255);
	this.colorB = p5.random(255);
	this.alpha = 5;

	this.display = () => {
		const ra = Math.sin(this.a) * this.a;
		const rb = Math.sin(this.b) * this.b;
	
		p5.noStroke();
		p5.fill(this.colorR, this.colorB, this.colorG, 20);
		p5.ellipse(this.x, this.y, ra, rb);
	}

	this.animate = (xRate, yRate) => {
		this.a += 1e-4 * xRate;
		this.b += 1e-4 * yRate;

		if (Math.abs(this.a) > p5.width * 3) this.a = 0;
		if (Math.abs(this.b) > p5.height * 3) this.b = 0;
	}
}

class Animation {

	constructor(container, parameters) {
		this.container = container;

		this.numWaves = parameters.numWaves.currentValue;
		this.xRate = parameters.xRate.currentValue;
		this.yRate = parameters.yRate.currentValue;

		this.waves = [];

		this.colorR = p5.random(255);
		this.colorG = p5.random(255);
		this.colorB = p5.random(255);
	}

	setup() {
		p5.createCanvas(this.container.clientWidth, this.container.clientHeight).parent(this.container);

		// draw background
		p5.background(p5.random(255), p5.random(255), p5.random(255));

		// add numWaves waves to the sketch
		Array.from({ length: this.numWaves}, (_, i) => {
			this.waves.push(new Wave(i * 100, i * 100))
		});
	}

	draw() {

		for (const wave of this.waves) {
			wave.display();
			wave.animate(this.xRate, this.yRate);
		}

	}
}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_puddle_colored',
		name: 'puddle-colored',
		// category: 'shapes',
		// controllable: true,
		// dynamic: false,
		// hidden: true,
		resizable: false,
        parameters: {
            numWaves: {
                label: 'Number of Waves',
                defaultValue: 9,
                currentValue: 9,
                maxValue: 100,
                minValue: 0
            },
            xRate: {
                label: 'X-Rate',
                defaultValue: 50,
                currentValue: 50,
                maxValue: 100,
                minValue: 0
            },
            yRate: {
                label: 'Y-Rate',
                defaultValue: 50,
                currentValue: 50,
                maxValue: 100,
                minValue: 0
            }
        },
		text: 'Puddle (Colored)'
	},
	init(sketch, container) {

		p5 = sketch;

		const animation = new Animation(container, this.metadata.parameters);
		
		p5.setup = () => animation.setup();
		p5.draw = () => animation.draw();

		return p5;
	}

}
