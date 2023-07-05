import { SVG_NAMESPACE_URL } from '@entities/galaxy/model/constants';

interface ICreateSvgContainer {
  galaxyPage: HTMLElement | null;
  svgContainerClass: string;
}

//функция создания контейнера svg элементов (для связей между элементами)
export const createSvgContainer = (params: ICreateSvgContainer): SVGElement | null => {
    const {
        galaxyPage,
        svgContainerClass,
    } = params;

    if (galaxyPage === null) {
        return null;
    }

    const svgContainer = document.createElementNS(
        SVG_NAMESPACE_URL,
        'svg',
    );

    svgContainer.setAttribute('class', svgContainerClass);

    galaxyPage.append(svgContainer);

    return svgContainer;
};