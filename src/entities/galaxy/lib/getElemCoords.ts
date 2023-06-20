import {
    HTML_ELEMENT,
    SVG_ELEMENT,
} from '@entities/galaxy/model/constants';

interface IGetElemCoords {
  elem: HTMLElement | SVGSVGElement | null;
  type: 'HTMLElement' | 'SVGSVGElement';
  planetWidth?: number;
  planetHeight?: number;
}

//получение координат SVGSVGElement элемента или середины HTMLElement элемента
export const getElemCoords = (params: IGetElemCoords) => {
    const {
        elem,
        type,
        planetWidth,
        planetHeight,
    } = params;

    if (!elem) {
        return;
    }

    const box = elem.getBoundingClientRect();

    const body = document.body;
    const documentElement = document.documentElement;

    const scrollTop =
    window.scrollY || documentElement.scrollTop || body.scrollTop;

    const scrollLeft =
    window.scrollX || documentElement.scrollLeft || body.scrollLeft;

    const clientTop = documentElement.clientTop || body.clientTop || 0;
    const clientLeft = documentElement.clientLeft || body.clientLeft || 0;

    let top = 0;
    let left = 0;

    switch (type) {
        case HTML_ELEMENT: {
            if (planetWidth !== undefined && planetHeight !== undefined) {
                top = box.top + scrollTop - clientTop + planetHeight / 2;
                left = box.left + scrollLeft - clientLeft + planetWidth / 2;
            }

            break;
        }
        case SVG_ELEMENT: {
            top = box.top + scrollTop - clientTop;
            left = box.left + scrollLeft - clientLeft;

            break;
        }
        default:
            break;
    }

    return {
        top: Math.round(top),
        left: Math.round(left),
    };
};
