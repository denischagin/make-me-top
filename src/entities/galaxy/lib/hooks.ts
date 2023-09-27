import {
    useEffect,
    useState,
} from 'react';

import { createSvgContainer } from '@entities/galaxy/lib/createSvgContainer';

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
