import {
    CourseInfoResponse, CourseResponse,
    CurrentCourseRequestInterface, GetExplorerProgressResponseInterface, GetKeeperCurrentGroupInterface,
    RequestCourseBodyInterface,
    RequestCourseParamsInterface,
} from '@entities/course/model/types/api';
import { baseApi } from '@shared/api/baseApi';
import { ErrorInterface, PostCourseRequest } from '@shared/types/common';

export const courseApi = baseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        acceptCourseRequest: builder.mutation<
            ErrorInterface,
            RequestCourseParamsInterface
        >({
            query: ({ requestId }) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                method: 'PATCH',
                body: {
                    approved: true,
                } as RequestCourseBodyInterface,
            }),
            invalidatesTags: ['getExplorerCardInfo', 'getKeeperProfile'],
        }),

        rejectCourseRequest: builder.mutation<
            ErrorInterface,
            RequestCourseParamsInterface
        >({
            query: ({ requestId }) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                method: 'PATCH',
                body: {
                    approved: false,
                } as RequestCourseBodyInterface,
            }),

            invalidatesTags: ['getExplorerCardInfo', 'getKeeperProfile'],
        }),

        leaveCourseByExplorerId: builder.mutation<ErrorInterface, number>({
            query: (explorerId) => ({
                url: `person-app/explorers/${explorerId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getExplorerProfile', 'getExplorerCardInfo'],
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
            invalidatesTags: ['getKeeperProfile'],
        }),

        addHomework: builder.mutation<void, { groupId: string | number, themeId: string | number }>({
            query: (args) => ({
                url: `course-registration-app/courses/${args.themeId}/`,
                method: 'POST',
            }),
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
            invalidatesTags: ['getKeeperProfile'],
        }),
    }),
});

export const {
    useCloseCourseRequestMutation,
    usePostCourseRequestMutation,
    useLeaveCourseByExplorerIdMutation,
    useAcceptCourseRequestMutation,
    useRejectCourseRequestMutation,
    useGetCourseInfoByCourseIdDetailedQuery,
    useGetCurrentCourseRequestQuery,
    useStartEducationOnCourseMutation,
    useGetExplorerCourseProgressQuery,
    useGetKeeperCurrentGroupQuery,
    useGetCourseInfoByCourseIdQuery,
    useSendCourseMarkMutation,
} = courseApi;
