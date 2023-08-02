import {
    SystemDependencyType,
} from '@entities/galaxy/model/types';

export interface RequiredStarsListInterface {
    list: Array<SystemDependencyType> | undefined;
}
