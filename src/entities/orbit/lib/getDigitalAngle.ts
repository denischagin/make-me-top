//преобразование грудусного угла в числовой,
//градус увеличивается против часовой, начало совпадает с положительной частью оси Y
export const getDigitalAngle = (angle: number): number => {

    return ((2 * Math.PI) / 360) * angle + Math.PI / 2;
}
