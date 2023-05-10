interface IGetXCoordinateOnEllipseProps {
    ellipseHalfWidth: number,
    radius: number,
    digitalAngle: number,
    elementWidth: number
}

//расчет координаты X для элемента на границе эллипса
export const getXCoordinateOnEllipse = (props: IGetXCoordinateOnEllipseProps): number => {
    const {
        ellipseHalfWidth,
        radius,
        digitalAngle,
        elementWidth,
    } = props

    return Math.round(
        ellipseHalfWidth -
        radius *
        Math.cos(digitalAngle) -
        elementWidth / 2
    )
}
