interface IGetYCoordinateOnEllipseProps {
    ellipseHalfHeight: number,
    radius: number,
    digitalAngle: number,
    elementHeight: number
}

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
