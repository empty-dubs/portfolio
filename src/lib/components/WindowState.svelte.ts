import { innerWidth, innerHeight } from "svelte/reactivity/window";

import { getContext, setContext } from "svelte";

interface WindowState {
    screenType: string;
    aspectRatioType: string;
}

class WindowStateManager implements WindowState {

    screenType = $derived.by(() => {
        let screenType: string = 'monitor';

        if (innerWidth.current < 768) {
            screenType = 'phone';
        } else if (innerWidth.current <= 1024) {
            screenType = 'tablet';
        }

        return screenType;
    });

    aspectRatioType = $derived.by(() => {
        return innerWidth.current / innerHeight.current > 2 ? 'widescreen': 'normal';
    });

}

const DEFAULT_KEY = '$_window_state';

export const getWindowState = (key=DEFAULT_KEY) => {
    return getContext<WindowState>(key);
}

export const setWindowState = (key=DEFAULT_KEY) => {
    const windowStateManager = new WindowStateManager();

    return setContext<WindowState>(key, windowStateManager);
}
