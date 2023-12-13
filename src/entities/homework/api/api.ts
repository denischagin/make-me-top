import { baseApi } from '@shared/api/baseApi';
import {
    CreateHomeworkArgsInterface,
    GetHomeworkRequestsInterface,
    GetHomeworksType,
    SendHomeworkMarkArgsInterface,
    SendHomeworkRequestFeedbackArgsInterface,
    SendHomeworkVersionArgsInterface,
    UpdateHomeworkArgsInterface,
} from '@entities/homework/model/types/api';
import * as url from 'url';

export const homeworkApi = baseApi.injectEndpoints(({
    overrideExisting: false,
    endpoints: (builder) => ({
        // getHomeworks: builder.query<GetHomeworksType, { themeId: string, groupId: string }>({
        // 	query: ({ themeId, groupId }) => `homework-app/themes/${themeId}/groups/${groupId}/homeworks/`,
        // 	providesTags: ['getHomeworks']
        // }),
        getHomeworks: builder.query<GetHomeworksType, { themeId: string }>({
            query: ({ themeId }) => `homework-app/themes/${themeId}/homeworks/`,
            providesTags: ['getHomeworks'],
            extraOptions: {
                withOutToasts: true,
            },
        }),

        createHomework: builder.mutation<void, CreateHomeworkArgsInterface>({
            query: ({ themeId, groupId, content, title }) => ({
                url: `homework-app/themes/${themeId}/homeworks/`,
                body: {
                    content,
                    groupId,
                    title,
                },
                method: 'POST',
            }),
            invalidatesTags: ['getHomeworks', 'getExplorersWaitingThemeMark', 'getThemesWaitingExplorersMark'],
        }),

        updateHomework: builder.mutation<void, UpdateHomeworkArgsInterface>({
            query: ({ homeworkId, groupId, content, courseThemeId, title }) => ({
                url: `homework-app/homeworks/${homeworkId}`,
                body: {
                    courseThemeId,
                    content,
                    groupId,
                    title,
                },
                method: 'PUT',
            }),
            invalidatesTags: ['getHomeworks'],
        }),

        deleteHomework: builder.mutation<void, { homeworkId: number }>({
            query: ({ homeworkId }) => ({
                url: `homework-app/homeworks/${homeworkId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getHomeworks', 'getExplorersWaitingThemeMark', 'getThemesWaitingExplorersMark'],
        }),


        getHomeworkRequestByHomeworkId: builder.query<GetHomeworkRequestsInterface, string>({
            query: (homeworkId) => `homework-app/homeworks/${homeworkId}/homework-requests/`,
            providesTags: ['getHomeworkRequestsByHomeworkId'],
        }),

        getHomeworkRequestByRequestId: builder.query<GetHomeworkRequestsInterface, string>({
            query: (requestId) => `homework-app/homework-requests/${requestId}/`,
            providesTags: ['getHomeworkRequestsByRequestId'],
        }),

        sendHomeworkVersion: builder.mutation<void, SendHomeworkVersionArgsInterface>({
            query: ({ homeworkId, content }) => ({
                url: `homework-app/homeworks/${homeworkId}/homework-requests/`,
                method: 'POST',
                body: {
                    content,
                },
            }),
            invalidatesTags: ['getHomeworkRequestsByHomeworkId'],
        }),

        sendHomeworkRequestFeedback: builder.mutation<void, SendHomeworkRequestFeedbackArgsInterface>({
            query: ({ requestId, content }) => ({
                url: `homework-app/homework-requests/${requestId}/feedbacks/`,
                method: 'POST',
                body: {
                    content,
                },
            }),
            invalidatesTags: ['getHomeworkRequestsByRequestId'],
        }),

        sendHomeworkMark: builder.mutation<void, SendHomeworkMarkArgsInterface>({
            query: ({ requestId, comment, value }) => ({
                url: `homework-app/homework-requests/${requestId}/marks/`,
                method: 'POST',
                body: {
                    comment,
                    value,
                },
            }),
            invalidatesTags: ['getHomeworkRequestsByRequestId', 'getExplorersWaitingThemeMark', 'getThemesWaitingExplorersMark'],
        }),
    }),
}));

export const {
    useGetHomeworksQuery,
    useCreateHomeworkMutation,
    useUpdateHomeworkMutation,
    useDeleteHomeworkMutation,
    useGetHomeworkRequestByHomeworkIdQuery,
    useGetHomeworkRequestByRequestIdQuery,
    useSendHomeworkVersionMutation,
    useSendHomeworkRequestFeedbackMutation,
    useSendHomeworkMarkMutation,
} = homeworkApi;