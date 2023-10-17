import { SystemDependencyType } from '@entities/galaxy/model/types';

export interface RequiredSystemsListInterface {
    systemList?: SystemDependencyType[];
    handleChangeSystem?: (systemId: number) => void;
}
