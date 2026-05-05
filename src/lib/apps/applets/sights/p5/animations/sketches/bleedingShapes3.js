let p5;

function Wave(width, height, rate, opacity, fillType, strokeType) {
	this.width = width;
	this.height = height;
	this.alpha = opacity;
	this.rate = 1e-2 * rate;
	this.fillType = fillType;
	this.strokeType = strokeType;
	this.angle = p5.random(p5.PI / 2);

	this.setColor = () => {
		this.colorR = p5.random(255);
		this.colorG = p5.random(255);
		this.colorB = p5.random(255);
	}

	this.setPosition = () => {
		this.posX = p5.random(p5.width);
		this.posY = p5.random(p5.height);
	}

	this.reset = () => {
		this.posX = p5.random(p5.width);
		this.posY = p5.random(p5.height);
	}

	this.setPosition();
	this.setColor();

	this.display = i => {

		if (this.strokeType === 'black') {
			p5.stroke(0);
		} else if (this.strokeType === 'opaque') {
			p5.stroke(this.colorR, this.colorB, this.colorG, 255);
		} else {
			p5.noStroke();
		}

		if (this.fillType === 'black') {
			p5.fill(0);
		} else if (this.fillType === 'opaque') {
			p5.fill(this.colorR, this.colorB, this.colorG, 255);
		} else if (this.fillType === 'translucent') {
			p5.fill(this.colorR, this.colorB, this.colorG, this.alpha)
		} else {
			p5.noFill();
		}

		if (i % 2) {
			p5.ellipse(this.posX, this.posY, this.width, this.width);
		} else {
			p5.rotate(this.angle);
			p5.rect(this.posX, this.posY, this.width, this.width);
		}
	}

	this.animate = i => {
		if (i % 2) {
			this.width += this.rate;

			if (this.width > p5.width / 2) {
				this.width = 0;
				this.reset();
			}
		} else {
			this.width -= this.rate;

			if (this.width <= 0) {
				this.width = p5.width / 2;

				this.reset();
			}
		}
	}
}

class Animation {

	constructor(container, parameters) {
		this.container = container;

		this.numWaves = parameters.numWaves.currentValue;
		this.opacity = parameters.opacity.currentValue;
		this.rate = parameters.rate.currentValue;
		this.fillType = parameters.fillType.currentValue;
		this.strokeType = parameters.strokeType.currentValue;

		if ((this.fillType === 'black' || this.fillType === 'none') && this.strokeType !== 'opaque') {
			alert('Update fill or stroke type.')
		}

		this.waves = [];
	}

	setColorMode(colorMode='RGB') {
		const colorModes = {
			'HSB': p5.colorMode(p5.HSB),
			'HSL': p5.colorMode(p5.HSL),
			'RGB': p5.colorMode(p5.RGB),
		}

		return colorModes[colorMode];
	}

	setEllipseMode(ellipseMode='CENTER') {
		const ellipseModes = {
			'CENTER': p5.ellipseMode(p5.CENTER),
			'CORNER': p5.ellipseMode(p5.CORNER),
			'CORNERS': p5.ellipseMode(p5.CORNERS),
			'RADIUS': p5.ellipseMode(p5.RADIUS),
		}

		return ellipseModes[ellipseMode];
	}

	setRectMode(rectMode='RADIUS') {
		const rectModes = {
			'CENTER': p5.rectMode(p5.CENTER),
			'CORNER': p5.rectMode(p5.CORNER),
			'CORNERS': p5.rectMode(p5.CORNERS),
			'RADIUS': p5.rectMode(p5.RADIUS),
		}

		return rectModes[rectMode];
	}

	initializeCanvas() {
		p5.createCanvas(this.container.clientHeight, this.container.clientHeight).parent(this.container);

		this.setColorMode();
		this.setEllipseMode();
		this.setRectMode();

		// draw background
		p5.background(0);
	}

	initializeDrawing() {
		Array.from({ length: this.numWaves }, () => {
			const a = p5.random(100);

			this.waves.push(new Wave(a, a, this.rate, this.opacity, this.fillType, this.strokeType));
		});
	}

	setup() {
		this.initializeCanvas();
		this.initializeDrawing();
	}

	draw() {

		Array.from(this.waves, (wave, i) => {
			wave.display(i);
			wave.animate(i);
		});

	}
}

export default {

  	metadata: {
		active: false,
		address: '/p5#sketches_bleeding_shapes3',
		name: 'bleeding-shapes-3',
		engine: 'p5',
		// category: 'shapes',
		// controllable: true,
		// dynamic: false,
		hidden: false,
		resizable: true,
        parameters: {
            numWaves: {
                label: 'Number of Waves',
                defaultValue: 20,
                currentValue: 20,
                maxValue: 100,
                minValue: 0
            },
            opacity: {
                label: 'Opacity',
                defaultValue: 2,
                currentValue: 2,
                maxValue: 255,
                minValue: 1
            },
            rate: {
                label: 'Rate',
                defaultValue: 50,
                currentValue: 50,
                maxValue: 500,
                minValue: 0
            },
			fillType: {
                label: 'Fill Type',
                defaultValue: 'translucent',
                currentValue: 'translucent',
				options: [
					'black',
					'opaque',
					'translucent',
					'none'
				],
				type: 'select'
            },
			strokeType: {
                label: 'Stroke Type',
                defaultValue: 'black',
                currentValue: 'black',
				options: [
					'black',
					'opaque',
					'none'
				],
				type: 'select'
            }
        },
		text: 'Bleeding Shapes 3'
	},
	init(sketch, container) {

		p5 = sketch;

		const animation = new Animation(container, this.metadata.parameters);
		
		p5.setup = () => animation.setup();
		p5.draw = () => animation.draw();

		return p5;
	}

}
