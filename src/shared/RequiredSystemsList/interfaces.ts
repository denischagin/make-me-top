import {
    SystemDependencyType,
} from '@entities/galaxy/model/types';

export interface RequiredSystemsListInterface {
    list: Array<SystemDependencyType> | undefined;
}
