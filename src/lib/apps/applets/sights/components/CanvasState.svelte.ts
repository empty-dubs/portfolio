import { getContext, onDestroy, setContext } from "svelte";
import P5CanvasManager from "../p5/components/canvasManager";
import ThreeJSCanvasManager from "../threeJS/components/canvasManager";

class CanvasStateManager {

    canvas = $state();

    constructor() {
        onDestroy(() => {
            this.canvas = null;
        })
    }

    setCanvas(engine: string, module=null) {
        this.canvas = null;

        if(engine === 'p5') {
            this.canvas = new P5CanvasManager(module);
        } else if (engine === 'threeJS') {
            this.canvas = new ThreeJSCanvasManager();
        } else {
            console.log('Invalid engine provided in CanvasStateManager.setCanvas');
        }
    }

}

const DEFAULT_KEY = '$_canvas_state';

export const getCanvasState = (key=DEFAULT_KEY) => {
    return getContext<CanvasState>(key);
}

export const setCanvasState = (key=DEFAULT_KEY) => {
    const canvasStateManager = new CanvasStateManager();

    return setContext<ReturnType<typeof setCanvasState>>(key, canvasStateManager);
}
