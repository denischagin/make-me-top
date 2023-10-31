import { createSvgContainer } from '@entities/galaxy/libs/helpers/createSvgContainer';
import {
    useEffect,
    useState,
} from 'react';


export const useLinesSvgContainer = (
    galaxyPage: HTMLElement | null,
    svgContainerClass: string,
) => {
    const [svgContainer, setSvgContainer] = useState<SVGElement | null>(null);

    //создание контейнера под линии связи,
    //контейнер создается в корне страницы, для соответствия ее размерам
    useEffect(() => {
        setSvgContainer(
            createSvgContainer({
                galaxyPage,
                svgContainerClass,
            }),
        );
    }, [galaxyPage, svgContainerClass]);

    return svgContainer;
};
