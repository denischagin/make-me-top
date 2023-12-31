import {
    LastChosenSystem,
    SystemProgress,
    SystemType,
} from '@entities/galaxy/model/types';

import { ErrorInterface } from '@shared/types/common';

export const DEFAULT_CHOSEN_SYSTEM: SystemType = {
    systemId: 0,
    systemName: '',
    systemLevel: 0,
    systemPosition: 0,
    systemDependencyList: [],
};

export const DEFAULT_SYSTEM_RESPONSE_MESSAGE: ErrorInterface = {
    timestamp: '',
    errorCode: '',
    errorMessage: '',
};

export const DEFAULT_SYSTEM_PROGRESS: SystemProgress = {
    isLocked: false,
};

export const DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE: LastChosenSystem = {
    ...DEFAULT_CHOSEN_SYSTEM,
    ...DEFAULT_SYSTEM_PROGRESS,
    ...DEFAULT_SYSTEM_RESPONSE_MESSAGE,
};

export const initialUserProgressByGalaxy = {
    studiedSystems: [],
    openedSystems: [],
    closedSystems: [],
};


export const CONNECTION_LINE_CLASS = 'galaxy-page__svg-container--connection-line';

export const SYSTEM_CLASS = 'system__orbit';
export const ACTIVE_SYSTEM_MODIFIER = 'system__orbit--activity-active';
export const INACTIVE_SYSTEM_MODIFIER = 'system__orbit--activity-inactive';

export const SVG_NAMESPACE_URL = 'http://www.w3.org/2000/svg';

//дефолтное присваивание id
export const DEFAULT_GALAXY_ID = 1;
