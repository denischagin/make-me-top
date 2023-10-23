import {
    GetSystemsBySystemIdResponse,
    SystemDependencyType,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';
import { CourseInfoInterface } from '@entities/user/model/types';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';
import { useMemo } from 'react';

export interface UseModalAccessStatusArgs {
    userProgress?: UserProgressInGalaxy;
    currentSystemId?: number | null;
    isExplorer?: boolean;
    courseInfo?: CourseInfoInterface;
    system?: GetSystemsBySystemIdResponse;
}

export interface UseModalAccessStatusReturn {
    modalAccessStatus: ModalAccessStatus;
    systemIsOpen?: boolean;
    isYouInStudying?: boolean;
    isYouAlreadyKeeper?: boolean;
    canYouSendCourseRequest?: boolean;
    isSystemAlreadyDone?: boolean;
    dependencySystemListWithParent?: SystemDependencyType[];
}

export interface GetModalAccessStatusAgs {
    systemIsOpen?: boolean;
    isYouInStudying?: boolean;
    isYouAlreadyKeeper?: boolean;
    isExplorer?: boolean;
    isSystemAlreadyDone?: boolean;
    isSystemNeedParents?: boolean;
}

export const useModalAccessStatus = ({
    courseInfo,
    currentSystemId,
    isExplorer,
    userProgress,
    system,
}: UseModalAccessStatusArgs): UseModalAccessStatusReturn => {
    const systemIsOpen = useMemo(
        () =>
            userProgress?.openedSystems.some(
                (systemId) => Number(currentSystemId) === systemId,
            ),
        [userProgress, currentSystemId],
    );

    const isYouInStudying = useMemo(
        () =>
            userProgress?.studiedSystems.some(
                ({ progress }) => progress < 100 && progress >= 0,
            ),
        [userProgress],
    );

    const isYouAlreadyKeeper = useMemo(
        () =>
            courseInfo?.keepers?.some(
                ({ personId }) => personId === userProgress?.personId,
            ),
        [courseInfo?.keepers, userProgress?.personId],
    );

    const isSystemAlreadyDone = useMemo(
        () =>
            userProgress?.studiedSystems.some(
                (studiedSystem) =>
                    studiedSystem.progress === 100 &&
                    courseInfo?.course?.courseId === studiedSystem.systemId,
            ),
        [userProgress?.studiedSystems, courseInfo?.course?.courseId],
    );

    const canYouSendCourseRequest =
        systemIsOpen && isExplorer && !isYouInStudying && !isYouAlreadyKeeper;

    const dependencySystemListWithParent = useMemo(
        () =>
            system?.systemDependencyList.filter(
                (system) =>
                    system.type === 'parent' &&
                    !userProgress?.studiedSystems.some(
                        (studiedSystem) =>
                            studiedSystem.systemId === system.systemId &&
                            studiedSystem.progress === 100,
                    ),
            ),

        [system?.systemDependencyList, userProgress?.studiedSystems],
    );

    const modalAccessStatus = getModalAccessStatus({
        isYouAlreadyKeeper,
        isYouInStudying,
        isSystemAlreadyDone,
        isSystemNeedParents: (dependencySystemListWithParent?.length ?? 0) > 0,
    });

    return {
        modalAccessStatus,
        canYouSendCourseRequest,
        isYouAlreadyKeeper,
        isYouInStudying,
        systemIsOpen,
        dependencySystemListWithParent,
    };
};

export const getModalAccessStatus = ({
    isYouAlreadyKeeper,
    isYouInStudying,
    isSystemAlreadyDone,
    isSystemNeedParents,
}: GetModalAccessStatusAgs): ModalAccessStatus => {
    if (isSystemNeedParents) return ModalAccessStatus.closed_needSystems;

    if (isSystemAlreadyDone) return ModalAccessStatus.studied_systemAlreadyDone;

    if (isYouInStudying) return ModalAccessStatus.closed_youInStuding;

    if (isYouAlreadyKeeper) return ModalAccessStatus.closed_youAlreadyKeeper;

    return ModalAccessStatus.opened;
};
