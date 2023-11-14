import { queryTags } from '@shared/api/queryTags';
import {
    KeeperCardInfoResponseInterface,
    KeeperFilterResponseInterface,
    KeeperProfileResponseInterface,
} from '@entities/keeper/model/types/api';
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
    useGetAllKeepersQuery,
    useGetKeeperCardInfoQuery,
} = keeperApi;
