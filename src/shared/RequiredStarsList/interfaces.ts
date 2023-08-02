import {
    SystemDependencyType,
    SystemType,
} from '@entities/galaxy/model/types';

import { SystemResponseInterface } from '@entities/orbit/api/fetchSystemById';

import { ErrorInterface } from '@shared/types/common';

export interface RequiredStarInterface {
    name: string;
    id: number | null;
}

export interface RequiredStarsListInterface {
    list: Array<SystemDependencyType> | undefined;
}

export const DEFAULT_SYSTEM: SystemType = {
    systemId: 0,
    systemName: 'Loading...',
    systemLevel: 0,
    systemPosition: 0,
    systemDependencyList: [],
};

export const DEFAULT_SYSTEM_RESPONSE_MESSAGE: ErrorInterface = {
    timestamp: '',
    errorCode: '',
    errorMessage: '',
};

export const DEFAULT_LAST_FETCHED_SYSTEM: SystemResponseInterface = {
    ...DEFAULT_SYSTEM,
    ...DEFAULT_SYSTEM_RESPONSE_MESSAGE,
};
