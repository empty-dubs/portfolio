import { createContext } from 'svelte';

import type CanvasManager from './canvasManager';

export interface CanvasContext {
	canvasManager: CanvasManager | null;
}

export const [getCanvas, setCanvas] = createContext<CanvasContext>();
