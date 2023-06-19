import { TabInterface } from '@shared/types/common';

export interface CurrentStarCardInterface {
    starInfo: CurrentStarItemInterface;
    tabsList: Array<TabInterface>;
}

interface CurrentStarItemInterface {
    planet: {
        id: number;
        name: string;
    };
    star: string;
    curator: string;
    progress: number;
}
