import { queryTags } from '@shared/api/queryTags';
import { ErrorInterface } from '@shared/types/common';
import {
    KeeperCardInfoResponseInterface,
    KeeperFilterResponseInterface,
    KeeperProfileResponseInterface,
    RequestCourseBodyInterface,
    RequestCourseParamsInterface,
} from '@entities/keeper/model/types/api';
import toast from 'react-hot-toast';
import {
    TOAST_SUCCESS_APPROVED,
    TOAST_SUCCESS_REJECTED,
} from '@shared/constants/toastTitles';
import { baseApi } from '@shared/api/baseApi';

const {
    getExplorerCardInfo,
    getKeeperProfile: getKeeperCabinet,
    getAllKeepers,
    getKeeperCardInfo,
} = queryTags;

export const keeperApi = baseApi.injectEndpoints({
    overrideExisting: false,
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
