interface IGetElemCoords {
  element: HTMLElement | SVGSVGElement | null;
  elementWidth: number;
  elementHeight: number;
}

//получение координат середины элемента
export const getElemCoords = (params: IGetElemCoords) => {
    const {
        element,
        elementWidth,
        elementHeight,
    } = params;

    if (!element) {
        return;
    }

    const box = element.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    const scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.scrollX || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop;
    const clientLeft = docEl.clientLeft || body.clientLeft;

    const top = box.top + scrollTop - clientTop + elementHeight / 2;
    const left = box.left + scrollLeft - clientLeft + elementWidth / 2;

    return {
        top: Math.round(top),
        left: Math.round(left),
    };
};
