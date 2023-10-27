import { queryTags } from '@shared/api/queryTags';
import {
    ExplorerCardInfoResponseInterface,
    ExplorerFilterResponseInterface,
    ExplorerInfoResponseInterface,
} from '../model/types/api';
import { baseApi } from '@shared/api/baseApi';

export const explorerApi = baseApi.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getExplorerProfile: builder.query<ExplorerInfoResponseInterface, void>({
            query: () => ({
                url: 'person-app/people/explorer-profile',
            }),

            providesTags: [queryTags.getExplorerProfile],
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
    useGetAllExplorersQuery,
    useGetExplorerCardInfoQuery,
} = explorerApi;
