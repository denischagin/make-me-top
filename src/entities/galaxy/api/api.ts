import {
    GalaxyForGetAll,
    GalaxyResponseInterface,
    GetExplorerProgressByExplorerIdResponse,
    GetSystemsBySystemIdAgruments,
    GetSystemsBySystemIdResponse,
    GetUserProgressInGalaxyResponse,
} from '../model/types';
import {
    ModalPlanetInterface,
} from '@entities/user/model/types';
import { queryTags } from '@shared/api/queryTags';
import { baseApi } from '@shared/api/baseApi';

export const galaxiesApi = baseApi.injectEndpoints({
    overrideExisting: false,
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

        getPlanetsBySystemId: builder.query<ModalPlanetInterface[], number>({
            query: (systemId) => ({
                url: `planet-app/systems/${systemId}/planets`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((planet) => ({
                              type: queryTags.getPlanetsBySystemId,
                              id: planet.planetId,
                          })),
                          queryTags.getPlanetsBySystemId,
                      ]
                    : [queryTags.getPlanetsBySystemId],
        }),

        getSystemsBySystemId: builder.query<
            GetSystemsBySystemIdResponse,
            GetSystemsBySystemIdAgruments
        >({
            query: ({ systemId, withDependencies }) => ({
                url: `galaxy-app/systems/${systemId}`,
                params: {
                    withDependencies,
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                          {
                              type: queryTags.getSystemsBySystemId,
                              id: result.systemId,
                          },
                          queryTags.getSystemsBySystemId,
                      ]
                    : [queryTags.getSystemsBySystemId],
        }),

        getExplorerProgressByExplorerId: builder.query<
            GetExplorerProgressByExplorerIdResponse,
            number
        >({
            query: (explorerId) => ({
                url: `progress-app/explorers/${explorerId}`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          {
                              type: queryTags.getExplorerProgressByExplorerId,
                              id: result.courseId,
                          },
                          queryTags.getExplorerProgressByExplorerId,
                      ]
                    : [queryTags.getExplorerProgressByExplorerId],
        }),
    }),
});

export const {
    useGetAllGalaxiesQuery,
    useGetGalaxyQuery,

    useGetUserProgressInGalaxyQuery,


    useGetPlanetsBySystemIdQuery,

    useGetSystemsBySystemIdQuery,

    useGetExplorerProgressByExplorerIdQuery,
} = galaxiesApi;
