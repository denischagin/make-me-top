import { SystemDependencyType } from '@entities/galaxy/model/types';

export interface RequiredStarInterface {
    name: string;
    id: number | null;
}

export interface RequiredStarsListInterface {
    list: Array<SystemDependencyType> | undefined;
}
