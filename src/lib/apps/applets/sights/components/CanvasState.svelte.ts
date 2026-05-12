import { getContext, onDestroy, setContext } from "svelte";
import P5CanvasManager from "../p5/components/canvasManager";
import ThreeJSCanvasManager from "../threeJS/components/canvasManager";

class CanvasStateManager {

    canvas = $state();
    recorder: MediaRecorder | null = null;
    chunks = [];

    constructor() {
        onDestroy(() => {
            this.canvas = null;
            this.recorder = null;
            this.chunks = [];
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

    download(animation) {
        const blobOptions = { type: "video/webm" };

        const blob = new Blob(this.chunks, blobOptions);

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.style = "display: none";
        a.href = url;
        a.download = `${animation.metadata.name}.webm`;

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);
    }

    record(animation, canvas, fps=60, duration=1000) {

        const recordOptions = { mimeType: "video/webm; codecs=vp9" };
        const stream = canvas.captureStream(fps);

        this.chunks = [];

        this.recorder = new MediaRecorder(stream, recordOptions);

        this.recorder.ondataavailable = event => {
            if (event.data.size > 0) {
                this.chunks.push(event.data);
            }
        }

        this.recorder.addEventListener('stop', event => {
            this.download(animation);
        })

        this.recorder.start();

        setTimeout(event => {
            this.recorder?.stop();
        }, duration);
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
