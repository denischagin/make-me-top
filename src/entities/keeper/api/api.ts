import { KeeperProfileResponseInterface } from '@entities/keeper/thunks/getKeeperInfo';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithAuth } from '@shared/api';
import { queryTags } from '@shared/api/queryTags';
import { ErrorInterface } from '@shared/types/common';
import { RejectCourseInterface } from '../thunks/acceptOrRejectCourseRequest';
import { KeeperFilterResponseInterface } from '../thunks/getListKeepersByFilter';
import { KeeperCardInfoResponseInterface } from '../thunks/getKeeperCardInfo';

export const keeperApi = createApi({
    reducerPath: 'keeperApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: [queryTags.getKeeperCabinet],
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
                method: "PATCH"
            }),
            invalidatesTags: [queryTags.getKeeperCabinet],
        }),

        getAllKeepers: builder.query<KeeperFilterResponseInterface[], void>({
            query: () => ({
                url: `person-app/people`,
                params: { as: 'keeper' },
            }),
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
        }),
    }),
});

export const {
    useGetKeeperProfileQuery,
    useAcceptOrRejectCourseRequestMutation,
    useGetAllKeepersQuery,
    useGetKeeperCardInfoQuery,
} = keeperApi;
