import { createApi } from '@reduxjs/toolkit/query/react';

import {
    GalaxyForGetAll,
    GalaxyResponseInterface,
    GetUserProgressInGalaxyResponse,
} from '../model/types';
import { baseQueryWithAuth } from '@shared/api';

export const galaxiesApi = createApi({
    reducerPath: 'galaxiesApi',
    baseQuery: baseQueryWithAuth,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getAllGalaxies: builder.query<GalaxyForGetAll[], void>({
            query: () => ({
                url: 'galaxy-app/galaxies/',
                params: { detailed: true },
            }),
        }),

        getGalaxy: builder.query<GalaxyResponseInterface, number>({
            query: (galaxyId) => ({
                url: `galaxy-app/galaxies/${galaxyId}`,
            }),
        }),

        getUserProgressInGalaxy: builder.query<
            GetUserProgressInGalaxyResponse,
            number
        >({
            query: (galaxyId) => ({
                url: `progress-app/galaxies/${galaxyId}`,
            }),
        }),
    }),
});

export const {
    useGetAllGalaxiesQuery,
    useGetGalaxyQuery,
    useGetUserProgressInGalaxyQuery,
} = galaxiesApi;
