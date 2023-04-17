export const deleteAllConnectionLines = (svgContainer: SVGSVGElement | null) => {
    if (!svgContainer) {
        return
    }

    const elementsFromSvgContainer = Array.from(svgContainer.children || []);
    const allConnectionLines = elementsFromSvgContainer.filter(element => element.matches(".connection-line"));

    allConnectionLines.forEach(line => {
        line.remove();
    })
}