export function resetAnimation (animation: object, canvas, parameters): void {
    for (const parameter of parameters) parameter.currentValue = parameter.defaultValue;

    canvas.draw(animation);
};

export function restartAnimation(animation: object, canvas): void {
    canvas.draw(animation)
};

export function toFullScreen(canvas): void {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    }
};
