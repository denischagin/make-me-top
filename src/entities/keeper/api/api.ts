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
import toast from 'react-hot-toast';
import {
    TOAST_SUCCESS_APPROVED,
    TOAST_SUCCESS_REJECTED,
} from '@shared/constants/toastTitles';

const {
    getExplorerCardInfo,
    getKeeperCabinet,
    getAllKeepers,
    getKeeperCardInfo,
} = queryTags;

export const keeperApi = createApi({
    reducerPath: 'keeperApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: [
        getKeeperCabinet,
        getKeeperCardInfo,
        getAllKeepers,
        getExplorerCardInfo,
    ],
    refetchOnMountOrArgChange: 1,
    endpoints: (builder) => ({
        getKeeperProfile: builder.query<KeeperProfileResponseInterface, void>({
            query: () => ({
                url: 'person-app/people/keeper-profile',
            }),
            providesTags: (result) =>
                result
                    ? [
                          {
                              type: getKeeperCabinet,
                              id: result.person.personId,
                          },
                          getKeeperCabinet,
                      ]
                    : [getKeeperCabinet],
        }),

        acceptCourseRequest: builder.mutation<
            ErrorInterface,
            RejectCourseInterface
        >({
            query: ({ requestId }) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                data: {
                    rejection: {
                        approved: false,
                    },
                    requestId,
                } as RejectCourseInterface,
                method: 'PATCH',
            }),
            onQueryStarted: (_, { queryFulfilled }) => {
                queryFulfilled.then(() => {
                    toast(TOAST_SUCCESS_APPROVED, {
                        icon: '🤩',
                    });
                });
            },
            invalidatesTags: [getExplorerCardInfo],
        }),

        rejectCourseRequest: builder.mutation<
            ErrorInterface,
            RejectCourseInterface
        >({
            query: ({ rejection, requestId }) => ({
                url: `course-registration-app/course-requests/${requestId}`,
                data: {
                    rejection: {
                        approved: false,
                    },
                    requestId,
                } as RejectCourseInterface,
                method: 'PATCH',
            }),
            onQueryStarted: (_, { queryFulfilled }) => {
                queryFulfilled.then(() => {
                    toast(TOAST_SUCCESS_REJECTED, {
                        icon: '😔',
                    });
                });
            },
            invalidatesTags: [getExplorerCardInfo],
        }),

        getAllKeepers: builder.query<KeeperFilterResponseInterface[], void>({
            query: () => ({
                url: `person-app/people`,
                params: { as: 'keeper' },
            }),
            providesTags: [getAllKeepers],
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
            providesTags: [getKeeperCardInfo],
        }),
    }),
});

export const {
    useGetKeeperProfileQuery,
    useAcceptCourseRequestMutation,
    useRejectCourseRequestMutation,
    useGetAllKeepersQuery,
    useGetKeeperCardInfoQuery,
} = keeperApi;
