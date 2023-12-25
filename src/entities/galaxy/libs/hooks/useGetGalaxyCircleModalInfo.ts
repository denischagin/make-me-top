import { useGetCourseInfoByCourseIdDetailedQuery, useGetCurrentCourseRequestQuery } from '@entities/course';
import {
    useGetExplorerProgressByExplorerIdQuery,
    useGetPlanetsBySystemIdQuery,
    useGetSystemsBySystemIdQuery,
} from '@entities/galaxy/api/api';
import { useAuth } from '@entities/viewer';

export interface UseGetGalaxyCircleModalInfoParams {
    isOpen: boolean;
    currentSystemId?: number | null;
}

export const useGetGalaxyCircleModalInfo = ({
                                                currentSystemId,
                                                isOpen,
                                            }: UseGetGalaxyCircleModalInfoParams) => {
    const { role } = useAuth();
    const isExplorer = role === 'EXPLORER';

    const { data: planets } = useGetPlanetsBySystemIdQuery(
        Number(currentSystemId),
        {
            skip: !isOpen,
        },
    );

    const { data: courseInfo, isFetching: isFetchingCourseInfo } =
        useGetCourseInfoByCourseIdDetailedQuery(Number(currentSystemId), {
            skip: !isOpen,
        });

    const { data: system, isFetching: isFetchingSystem } =
        useGetSystemsBySystemIdQuery(
            {
                withDependencies: true,
                systemId: Number(currentSystemId),
            },
            { skip: !isOpen || !isExplorer },
        );

    const { data: explorerProgress } = useGetExplorerProgressByExplorerIdQuery(
        Number(courseInfo?.you?.explorerId),
        { skip: !courseInfo?.you || !isOpen },
    );

    const { isSuccess: isCurrentRequestExists } =
        useGetCurrentCourseRequestQuery(undefined, {
            skip: !isExplorer || !isOpen,
        });

    const isFetching = isFetchingCourseInfo || isFetchingSystem;

    return {
        planets,
        explorerProgress,
        isCurrentRequestExists,
        isFetching,
        system,
        courseInfo,
    };
};
