interface IGetRadius {
    digitalAngle: number,
    halfWidth: number,
    halfHeight: number
}

//расчет радиуса эллипса по определенному градусу
export const getRadius = (params: IGetRadius): number => {
    const {
        digitalAngle,
        halfHeight,
        halfWidth
    } = params

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
