interface IGetElemCoords {
  elem: HTMLElement | SVGSVGElement | null;
  type: "HTMLElement" | "SVGSVGElement";
  planetWidth?: number;
  planetHeight?: number;
}

//получение координат SVGSVGElement элемента или середины HTMLElement элемента
export const getElemCoords = (params: IGetElemCoords) => {
  const { elem, type, planetWidth, planetHeight } = params;

  if (!elem) {
    return;
  }

  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.scrollX || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop;
  const clientLeft = docEl.clientLeft || body.clientLeft;

  let top = 0;
  let left = 0;

  switch (type) {
    case "HTMLElement": {
      if (planetWidth !== undefined && planetHeight !== undefined) {
        top = box.top + scrollTop - clientTop + planetHeight / 2;
        left = box.left + scrollLeft - clientLeft + planetWidth / 2;
      }

      break;
    }
    case "SVGSVGElement": {
      top = box.top + scrollTop + -clientTop;
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
