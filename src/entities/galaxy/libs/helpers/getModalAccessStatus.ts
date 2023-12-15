import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';

export interface GetModalAccessStatusAgs {
    systemIsOpen?: boolean;
    isYouInStudying?: boolean;
    isYouAlreadyKeeper?: boolean;
    isExplorer?: boolean;
    isSystemAlreadyDone?: boolean;
    isSystemNeedParents?: boolean;
    isCurrentRequestExists?: boolean;
    fromGalaxy?: boolean
}

export const getModalAccessStatus = ({
    isYouAlreadyKeeper,
    isYouInStudying,
    isSystemAlreadyDone,
    isSystemNeedParents,
    isCurrentRequestExists,
    fromGalaxy
}: GetModalAccessStatusAgs): ModalAccessStatus => {
    if (!fromGalaxy) return ModalAccessStatus.opened

    if (isSystemNeedParents) return ModalAccessStatus.closed_needSystems;

    if (isSystemAlreadyDone) return ModalAccessStatus.studied_systemAlreadyDone;

    if (isCurrentRequestExists)
        return ModalAccessStatus.closed_currentRequestAlreadyExists;

    if (isYouInStudying) return ModalAccessStatus.closed_youInStuding;

    if (isYouAlreadyKeeper) return ModalAccessStatus.closed_youAlreadyKeeper;

    return ModalAccessStatus.opened;
};
