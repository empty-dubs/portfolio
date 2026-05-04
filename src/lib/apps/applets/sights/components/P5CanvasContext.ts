import { createContext } from "svelte";

import type CanvasManager from "../p5/components/canvasManager";

export interface CanvasContext {
	canvasManager: CanvasManager | null;
}

export const [getCanvas, setCanvas] = createContext<CanvasContext>();
