import { createContext } from "svelte";

import type CanvasManager from "../threeJS/components/canvasManager";

export interface CanvasContext {
	canvasManager: CanvasManager | null;
}

export const [getCanvas, setCanvas] = createContext<CanvasContext>();
