interface IDeleteAllConnectionLinesProps {
    svgContainer: SVGSVGElement | null,
}
export const deleteAllConnectionLines = (props: IDeleteAllConnectionLinesProps) => {
    const {
        svgContainer,
    } = props

    if (!svgContainer) {
        return
    }

    const elementsFromSvgContainer = Array.from(svgContainer.children || []);
    const allConnectionLines = elementsFromSvgContainer.filter(element => element.matches(".galaxy__connection-line"));

    allConnectionLines.forEach(line => {
        line.remove();
    })
}
