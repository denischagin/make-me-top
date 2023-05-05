export const getDigitalAngle = (angle: number): number => {
    return ((2 * Math.PI) / 360) * angle + Math.PI / 2;
}
