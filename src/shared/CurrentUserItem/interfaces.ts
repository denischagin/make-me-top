import { ExplorerInfoInterface } from '@entities/explorer/model/types/interfaces';

import { UserInterface } from '@shared/types/common';

export interface CurrentUserItemInterface {
    user: ExplorerInfoInterface;
    badgeTitle: string;
}
