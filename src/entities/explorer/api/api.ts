import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithAuth } from '@shared/api';
import { queryTags } from '@shared/api/queryTags';
import { ErrorInterface, PostCourseRequest } from '@shared/types/common';
import {
    ExplorerCardInfoResponseInterface,
    ExplorerFilterResponseInterface,
    ExplorerInfoResponseInterface,
} from '../model/types/api';

export const explorerApi = createApi({
    reducerPath: 'explorerApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: [
        queryTags.getExplorerCabinet,
        queryTags.getExplorerCardInfo,
        queryTags.getAllExplorers,
    ],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getExplorerProfile: builder.query<ExplorerInfoResponseInterface, void>({
            query: () => ({
                url: 'person-app/people/explorer-profile',
            }),
            
            providesTags: (result) =>
                result
                    ? [
                          {
                              type: queryTags.getExplorerCabinet,
                              id: result.person.personId,
                          },
                          queryTags.getExplorerCabinet,
                      ]
                    : [queryTags.getExplorerCabinet],
        }),

        closeCourseRequest: builder.mutation<ErrorInterface, number>({
            query: (requestId: number) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [queryTags.getExplorerCabinet],
        }),

        postCourseRequest: builder.mutation<ErrorInterface, PostCourseRequest>({
            query: (data) => ({
                url: 'course-registration-app/course-requests/',
                method: 'POST',
                data,
            }),
            invalidatesTags: [queryTags.getExplorerCabinet],
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
    }),
});

export const {
    useGetExplorerProfileQuery,
    useLazyGetExplorerProfileQuery,
    useCloseCourseRequestMutation,
    usePostCourseRequestMutation,
    useGetAllExplorersQuery,
    useGetExplorerCardInfoQuery,
} = explorerApi;
