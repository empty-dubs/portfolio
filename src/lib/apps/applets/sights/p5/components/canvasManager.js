//TODO: convert this to typescript file
//TODO: see if I can make this a svelte component instead,
// simiar to what I have in $lib/apps/d3/components/Canvas.svelte

export default class CanvasManager {

    constructor(module) {
        this.module = module;
    }

    initializeCanvas(canvas) {
        this.canvas = canvas;
    }

    resetCanvas () {
        if (this.p5) {
            this.p5.removeElements();
            this.p5.remove();
        }
    }

    draw (animation) {

        if (!animation) return;

        if (!this.module) return;

        if (!this.canvas) return;

        // clear canvas
        this.resetCanvas();

        // draw animation
        const p5 = new this.module(p5 => {
            this.p5 = animation.init(p5, this.canvas);
        });

        if (animation.metadata.resizable && this.p5) {
            this.p5.windowResized = () => {
                this.p5.resizeCanvas(this.canvas.clientWidth, this.canvas.clientHeight);
            };
        }

    }

}
