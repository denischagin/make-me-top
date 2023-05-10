interface IGetYCoordinateOnEllipseProps {
    ellipseHalfHeight: number,
    radius: number,
    digitalAngle: number,
    elementHeight: number
}

//расчет координаты Y для элемента на границе эллипса
export const getYCoordinateOnEllipse = (props: IGetYCoordinateOnEllipseProps): number => {
    const {
        ellipseHalfHeight,
        radius,
        digitalAngle,
        elementHeight
    } = props

    return Math.round(
        ellipseHalfHeight -
        radius * Math.sin(digitalAngle) -
        elementHeight / 2
    )
}
