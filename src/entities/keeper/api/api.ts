import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithAuth } from '@shared/api';
import { queryTags } from '@shared/api/queryTags';
import { ErrorInterface } from '@shared/types/common';
import { RejectCourseInterface } from '../thunks/acceptOrRejectCourseRequest';
import {
    KeeperCardInfoResponseInterface,
    KeeperFilterResponseInterface,
    KeeperProfileResponseInterface,
} from '@entities/keeper/model/types/api';

export const keeperApi = createApi({
    reducerPath: 'keeperApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: [
        queryTags.getKeeperCabinet,
        queryTags.getKeeperCardInfo,
        queryTags.getAllKeepers,
    ],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getKeeperProfile: builder.query<KeeperProfileResponseInterface, void>({
            query: () => ({
                url: 'person-app/people/keeper-profile',
            }),
            providesTags: (result) =>
                result
                    ? [
                          {
                              type: queryTags.getKeeperCabinet,
                              id: result.person.personId,
                          },
                          queryTags.getKeeperCabinet,
                      ]
                    : [queryTags.getKeeperCabinet],
        }),

        acceptOrRejectCourseRequest: builder.mutation<
            ErrorInterface,
            RejectCourseInterface
        >({
            query: ({ rejection, requestId }) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                data: rejection,
                method: 'PATCH',
            }),
            invalidatesTags: [queryTags.getKeeperCabinet],
        }),

        getAllKeepers: builder.query<KeeperFilterResponseInterface[], void>({
            query: () => ({
                url: `person-app/people`,
                params: { as: 'keeper' },
            }),
            providesTags: [queryTags.getAllKeepers],
        }),

        getKeeperCardInfo: builder.query<
            KeeperCardInfoResponseInterface,
            number
        >({
            query: (personId: number) => ({
                url: `person-app/people/${personId}`,
                params: {
                    as: 'keeper',
                },
            }),
            providesTags: [queryTags.getKeeperCardInfo],
        }),
    }),
});

export const {
    useGetKeeperProfileQuery,
    useAcceptOrRejectCourseRequestMutation,
    useGetAllKeepersQuery,
    useGetKeeperCardInfoQuery,
} = keeperApi;
