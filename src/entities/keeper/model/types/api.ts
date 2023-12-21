import { ErrorInterface } from '@shared/types/common';
import { KeeperCardInfoInterface, KeeperInfoInterface, KeepersFilterInterface } from './interfaces';

export interface KeeperFilterResponseInterface
    extends KeepersFilterInterface,
        ErrorInterface {
}

export type GetAllKeepersList = {
    content: KeeperFilterResponseInterface[],
    totalPages: number
}

export interface KeeperIdInterface {
    personId: number;
}

export interface KeeperCardInfoResponseInterface
    extends KeeperCardInfoInterface,
        ErrorInterface {
}

export interface KeeperProfileResponseInterface
    extends KeeperInfoInterface,
        ErrorInterface {
}
