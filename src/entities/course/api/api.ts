import {
    AcceptCourseParamsInterface,
    CourseInfoResponse,
    CourseResponse,
    CurrentCourseRequestInterface,
    GetExplorerProgressResponseInterface,
    GetKeeperCurrentGroupInterface,
    GetKeeperRejectionReasons,
    RejectCourseParamsInterface,
} from '@entities/course/model/types/api';
import { baseApi } from '@shared/api/baseApi';
import { ErrorInterface, PostCourseRequest } from '@shared/types/common';

export const courseApi = baseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        acceptCourseRequest: builder.mutation<
            ErrorInterface,
            AcceptCourseParamsInterface
        >({
            query: ({ requestId }) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                method: 'PATCH',
            }),
            invalidatesTags: ['getExplorerCardInfo', 'getKeeperProfile'],
        }),

        rejectCourseRequest: builder.mutation<
            ErrorInterface,
            RejectCourseParamsInterface
        >({
            query: ({ requestId, reasonId }) => ({
                url: `course-registration-app/course-requests/${requestId}/rejections/`,
                method: 'POST',
                body: {
                    reasonId,
                },
            }),

            invalidatesTags: ['getExplorerCardInfo', 'getKeeperProfile'],
        }),

        leaveCourseByExplorerId: builder.mutation<ErrorInterface, number>({
            query: (explorerId) => ({
                url: `person-app/explorers/${explorerId}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getExplorerProfile', 'getExplorerCardInfo', 'getKeeperProfile'],
        }),

        closeCourseRequest: builder.mutation<ErrorInterface, number>({
            query: (requestId: number) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getExplorerProfile'],
        }),

        postCourseRequest: builder.mutation<ErrorInterface, PostCourseRequest>({
            query: (body) => ({
                url: 'course-registration-app/course-requests/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['getExplorerProfile'],
        }),

        getCourseInfoByCourseId: builder.query<CourseResponse, number>({
            query: (courseId) => ({
                url: `course-app/courses/${courseId}`,
            }),
            providesTags: ['getCourseInfoByCourseId'],
        }),

        getCourseInfoByCourseIdDetailed: builder.query<CourseInfoResponse, number>({
            query: (courseId) => ({
                url: `course-app/courses/${courseId}`,
                params: {
                    detailed: true,
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                        {
                            type: 'getCourseInfoByCourseId',
                            id: result.course?.courseId,
                        },
                        'getCourseInfoByCourseId',
                    ]
                    : ['getCourseInfoByCourseId'],
        }),
        getCurrentCourseRequest: builder.query<
            CurrentCourseRequestInterface,
            void
        >({
            query: () => `course-registration-app/course-requests/processing/`,
            extraOptions: {
                withOutToasts: true,
            },
        }),

        startEducationOnCourse: builder.mutation<number, number>({
            query: (courseId) => ({
                url: `course-registration-app/courses/${courseId}/groups/`,
                method: 'POST',
            }),
            invalidatesTags: ['getKeeperProfile', 'getExplorerCardInfo'],
        }),

        getExplorerCourseProgress: builder.query<
            GetExplorerProgressResponseInterface,
            string | number
        >({
            query: (courseId) => `progress-app/courses/${courseId}`,
            providesTags: ['getExplorerCourseProgress'],
        }),

        getKeeperCurrentGroup: builder.query<
            GetKeeperCurrentGroupInterface,
            void
        >({
            query: () => `person-app/groups/current/`,
            providesTags: ['getKeeperCurrentGroup'],
            extraOptions: {
                withOutToasts: true,
            },
        }),

        sendCourseMark: builder.mutation<void, { value: number, explorerId: number }>({
            query: (body) => ({
                url: `progress-app/marks/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['getKeeperProfile', 'getExplorerCardInfo'],
        }),


        getKeeperRejectionReasons: builder.query<
            GetKeeperRejectionReasons,
            void
        >({
            query: () => `course-registration-app/course-requests/rejections/`,
            providesTags: ['getKeeperRejectionReasons'],
            extraOptions: {
                withOutToasts: true,
            },
        }),


    }),
});

export const {
    useCloseCourseRequestMutation,
    usePostCourseRequestMutation,
    useAcceptCourseRequestMutation,
    useRejectCourseRequestMutation,
    useGetCurrentCourseRequestQuery,
    useLeaveCourseByExplorerIdMutation,
    useGetCourseInfoByCourseIdDetailedQuery,
    useStartEducationOnCourseMutation,
    useGetExplorerCourseProgressQuery,
    useGetKeeperCurrentGroupQuery,
    useGetCourseInfoByCourseIdQuery,
    useSendCourseMarkMutation,
    useGetKeeperRejectionReasonsQuery,
} = courseApi;
