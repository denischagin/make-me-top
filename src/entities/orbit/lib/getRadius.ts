interface IGetRadius {
    digitalAngle: number,
    halfWidth: number,
    halfHeight: number
}

export const getRadius = (props: IGetRadius): number => {
    const {
        digitalAngle,
        halfHeight,
        halfWidth
    } = props

    return (halfWidth * halfHeight) /
        Math.sqrt(
            halfWidth *
            halfWidth *
            Math.sin(digitalAngle) *
            Math.sin(digitalAngle) +
            halfHeight *
            halfHeight *
            Math.cos(digitalAngle) *
            Math.cos(digitalAngle)
        )
}
