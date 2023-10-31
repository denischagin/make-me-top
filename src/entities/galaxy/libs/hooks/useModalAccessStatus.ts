import { CourseInfoResponse } from '@entities/course';
import { getModalAccessStatus } from '@entities/galaxy/libs/helpers/getModalAccessStatus';
import {
    GetSystemsBySystemIdResponse,
    SystemDependencyType,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';
import { useMemo } from 'react';

export interface UseModalAccessStatusArgs {
    userProgress?: UserProgressInGalaxy;
    currentSystemId?: number | null;
    isExplorer?: boolean;
    courseInfo?: CourseInfoResponse;
    system?: GetSystemsBySystemIdResponse;
    isCurrentRequestExists?: boolean;
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

export const useModalAccessStatus = ({
    courseInfo,
    currentSystemId,
    isExplorer,
    userProgress,
    system,
    isCurrentRequestExists,
}: UseModalAccessStatusArgs): UseModalAccessStatusReturn => {
    const systemIsOpen = useMemo(
        () =>
            userProgress?.openedSystems.some(
                (systemId) => Number(currentSystemId) === systemId,
            ),
        [userProgress, currentSystemId],
    );

    const studingSystem = useMemo(
        () =>
            userProgress?.studiedSystems.find(
                ({ progress }) => progress < 100 && progress >= 0,
            ),
        [userProgress],
    );

    const isYouInStudying =
        studingSystem && studingSystem?.systemId !== currentSystemId;

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
        systemIsOpen &&
        isExplorer &&
        !isYouInStudying &&
        !isYouAlreadyKeeper &&
        !isCurrentRequestExists;

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
        isCurrentRequestExists,
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
