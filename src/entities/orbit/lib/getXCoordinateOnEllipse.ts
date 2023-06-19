interface IGetXCoordinateOnEllipse {
    ellipseHalfWidth: number;
    radius: number;
    digitalAngle: number;
    elementWidth: number;
}

//расчет координаты X для элемента на границе эллипса
export const getXCoordinateOnEllipse = (params: IGetXCoordinateOnEllipse): number => {
    const {
        ellipseHalfWidth,
        radius,
        digitalAngle,
        elementWidth,
    } = params;

    return Math.round(ellipseHalfWidth - radius * Math.cos(digitalAngle) - elementWidth / 2);
};
