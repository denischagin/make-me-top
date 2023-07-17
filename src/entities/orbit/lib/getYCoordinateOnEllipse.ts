interface IGetYCoordinateOnEllipse {
  ellipseHalfHeight: number;
  radius: number;
  digitalAngle: number;
  elementHeight: number;
}

//расчет координаты Y для элемента на границе эллипса
export const getYCoordinateOnEllipse = (
    params: IGetYCoordinateOnEllipse,
): number => {
    const {
        ellipseHalfHeight,
        radius,
        digitalAngle,
        elementHeight,
    } = params;

    return Math.round(
        ellipseHalfHeight - radius * Math.sin(digitalAngle) - elementHeight / 2,
    );
};
