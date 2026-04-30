let p5;
let parameters;

let containerHeight;
let containerWidth;

let particle;

function setup(container) {

	// initialize canvas
	p5.createCanvas(containerWidth, containerHeight).parent(container);

	// draw background
	p5.background(250, 200, 200);

	particle = {
		x: p5.random(0, p5.width),
		y: p5.random(0, p5.height),
		vx: p5.random(0, 5),
		vy: p5.random(0, 5),
	}

}

function draw() {

	p5.fill(250, 200, 200);
	p5.ellipse(particle.x, particle.y, 50, 50);

	if (particle.x > p5.width || particle.x < 0) particle.vx = -particle.vx; 
	if (particle.y > p5.height || particle.y < 0) particle.vy = -particle.vy;

	particle.x += particle.vx * p5.random(0, 2);
	particle.y += particle.vy * p5.random(0, 2);

}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_random_covering',
		name: 'random-covering',
		// category: 'shapes',
		// controllable: true,
		// dynamic: false,
		hidden: true,
		resizable: false,
        parameters: {},
		text: 'Random Covering'
	},
	init(sketch, container) {

		containerWidth = container.clientWidth;
		containerHeight = container.clientHeight;

		p5 = sketch;
		parameters = this.metadata.parameters;
		
		p5.setup = () => setup(container);
		p5.draw = () => draw();

		return p5;
	}

}
