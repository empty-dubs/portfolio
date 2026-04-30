//TODO: convert this to typescript file
//TODO: see if I can make this a svelte component instead,
// simiar to what I have in $lib/apps/d3/components/Canvas.svelte

import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class CanvasManager {

    initializeCanvas(canvas) {
        // initialize canvas
        this.canvas = canvas;

        // initialize camera
        this.setCamera(3);

        //initialize renderer
        this.setRenderer(0x000000);

        // initialize scene
        this.scene = new Scene();
    }

    checkCanvasSize(canvas) {
        // update the aspect ratio
        if (this.camera) {
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        // update canvas size
        if (this.renderer)  {
            this.renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));
            this.renderer.setSize(canvas.clientWidth , canvas.clientHeight, false);
        }
    };

    // TODO: set backgroundColor to string or hex when changing to typescript
    // TODO: define default value?
    setRenderer(backgroundColor) {
        // create a WebGL renderer and bind to the canvas
        this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });

        // set background color and pixel ratio
        this.renderer.setClearColor(backgroundColor);
    };

    // TODO: set offset to number when changing to typescript
    // TODO: define default value?
    setCamera(offset) {
        // create a perspectie camera object
        this.camera = new PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);

        // set camera z-value
        this.camera.position.z = offset;
    };


    draw(animation) {
        if (!animation) return;

        if (!this.camera) {
            console.log('No camera found.');
            return
        }

        if (!this.renderer) {
            console.log('No renderer found.');
            return
        }

        if (!this.scene) {
            console.log('No scene found.');
            return
        }

        // cancel previous animation
        this.renderer.setAnimationLoop(null);

        // clean up canvas
        this.dispose();

        // reset camera and renderer
        this.setCamera(3);
        this.setRenderer(0x000000);

        // add controls if animation is controllable
        if(animation.metadata.controllable) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        }

        // create mesh objects and add to scene
        this.meshObjects = animation.init();

        if (!Array.isArray(this.meshObjects)) {
            this.meshObjects = [this.meshObjects]
        }

        for (const mesh of this.meshObjects) this.scene?.add(mesh);

        // create a clock element
        this.clock = new Clock();

        // run animation
        this.renderer.setAnimationLoop(() => {
            // resize canvas
            if (this.canvas.width != this.canvas.clientWidth || this.canvas.height != this.canvas.clientHeight) {
                this.checkCanvasSize(this.canvas);
            }

            // render scene
            this.renderer?.render(this.scene, this.camera);
        
            // run tick method if animation is dynamic
            if (animation.metadata.dynamic) this.tick();
        })

    };

    dispose() {
        // clean up scene geometries and materials
		this.scene?.traverse(obj => {
			if (obj.geometry) obj.geometry.dispose();
			if (obj.material) obj.material.dispose();
		});

        // remove elements from scene
        while (this.scene?.children.length > 0) this.scene?.remove(this.scene.children[0]);
    }

    tickAll(object, delta) {
        if (typeof object.tick === 'function') object.tick(delta);

        for (const child of object.children) this.tickAll(child, delta);
    }

    tick() {
        // get timestep (should be equivalent to 0.016, representing 16ms)
        const delta = this.clock?.getDelta();

        // run tick method on all objects
        for (const mesh of this.meshObjects) this.tickAll(mesh, delta);
    }
}
