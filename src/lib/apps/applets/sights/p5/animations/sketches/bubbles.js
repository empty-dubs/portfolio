let p5;
let parameters;

let containerHeight;
let containerWidth;

let bubbles;

function Bubble() {
	this.x = p5.width / 2;
	this.y = p5.height / 2;
	this.vx = Math.cos(p5.random(0, 2 * p5.TWO_PI));
	this.vy = Math.sin(p5.random(0, 2 * p5.TWO_PI));

	this.reset = () => {
		this.x = p5.width / 2;
		this.y = p5.height / 2;
	}

	this.display = () => {
		p5.strokeWeight(2);
		p5.stroke(255);
		p5.noFill();
		p5.ellipse(this.x, this.y, 12, 12);
	}

	this.move = () => {
		this.x += this.vx + Math.cos(p5.random(0, 2 * p5.TWO_PI));
		this.y += this.vy + Math.sin(p5.random(0, 2 * p5.TWO_PI));
	}

	this.bounce = () => {
		if (this.x >= p5.width + 5 || this.x <= -5) this.reset();
		if (this.y >= p5.height + 5 || this.y <= -5) this.reset();
	}

}

function setup(container) {

	const numBubbles = parameters.numBubbles.currentValue;

	bubbles = [];

	// initialize canvas
	p5.createCanvas(containerWidth, containerHeight).parent(container);

	// add numBubbles bubbles to the sketch
	Array.from({ length: numBubbles}, () => {
		bubbles.push(new Bubble())
	});

}

function draw() {

	// draw background
	p5.background(0);

	for (const bubble of bubbles) {
		bubble.move();
		bubble.bounce();
		bubble.display();
	}

}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_bubbles',
		name: 'bubbles',
		// category: 'shapes',
		// controllable: true,
		// dynamic: false,
		hidden: true,
		resizable: true,
        parameters: {
            numBubbles: {
                label: 'Number of Bubbles',
                defaultValue: 200,
                currentValue: 200,
                maxValue: 500,
                minValue: 0
            }
        },
		text: 'Bubbles'
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
