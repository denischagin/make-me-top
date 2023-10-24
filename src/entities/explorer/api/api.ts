import { queryTags } from '@shared/api/queryTags';
import { ErrorInterface, PostCourseRequest } from '@shared/types/common';
import {
    ExplorerCardInfoResponseInterface,
    ExplorerFilterResponseInterface,
    ExplorerInfoResponseInterface,
} from '../model/types/api';
import { baseApi } from '@shared/api/baseApi';
import toast from 'react-hot-toast';
import { TOAST_SUCCESS_REJECTED } from '@shared/constants/toastTitles';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/error';

export const explorerApi = baseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getExplorerProfile: builder.query<ExplorerInfoResponseInterface, void>({
            query: () => ({
                url: 'person-app/people/explorer-profile',
            }),

            providesTags: [queryTags.getExplorerProfile],
        }),

        closeCourseRequest: builder.mutation<ErrorInterface, number>({
            query: (requestId: number) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [queryTags.getExplorerProfile],
        }),

        postCourseRequest: builder.mutation<ErrorInterface, PostCourseRequest>({
            query: (body) => ({
                url: 'course-registration-app/course-requests/',
                method: 'POST',
                body,
            }),
            invalidatesTags: [queryTags.getExplorerProfile],
        }),

        getAllExplorers: builder.query<ExplorerFilterResponseInterface[], void>(
            {
                query: () => ({
                    url: `person-app/people`,
                    params: { as: 'explorer' },
                }),
                providesTags: [queryTags.getAllExplorers],
            },
        ),

        getExplorerCardInfo: builder.query<
            ExplorerCardInfoResponseInterface,
            number
        >({
            query: (personId: number) => ({
                url: `person-app/people/${personId}`,
                params: {
                    as: 'explorer',
                },
            }),
            providesTags: [queryTags.getExplorerCardInfo],
        }),

        leaveCourseRequestByExplorerId: builder.mutation<
            ErrorInterface,
            number
        >({
            query: (explorerId) => ({
                url: `person-app/explorers/${explorerId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['getExplorerCardInfo'],
            onQueryStarted: async (arg, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    toast(TOAST_SUCCESS_REJECTED, {
                        icon: '😔',
                    });
                } catch (error) {
                    toast(DEFAULT_ERROR_MESSAGE, {
                        icon: '😔',
                    });
                }
            },
        }),
    }),
});

export const {
    useGetExplorerProfileQuery,
    useCloseCourseRequestMutation,
    usePostCourseRequestMutation,
    useGetAllExplorersQuery,
    useGetExplorerCardInfoQuery,
    useLeaveCourseRequestByExplorerIdMutation,
} = explorerApi;
