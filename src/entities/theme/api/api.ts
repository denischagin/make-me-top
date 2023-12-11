import { baseApi } from '@shared/api/baseApi';
import { GetExplorersWaitingThemeMarkResponse, GetThemeByThemeIdResponse } from '@entities/theme';


export const themeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getThemeByThemeId: builder.query<GetThemeByThemeIdResponse, number>({
            query: (themeId) => ({
                url: `course-app/themes/${themeId}`,
            }),
            providesTags: ['getThemeById'],
        }),
        getExplorersWaitingThemeMark: builder.query<GetExplorersWaitingThemeMarkResponse, string>({
            query: (themeId) => ({
                url: `progress-app/themes/${themeId}/marks/`,
            }),
            providesTags: ['getExplorersWaitingThemeMark'],
        }),
        sendThemeMark: builder.mutation<number, { themeId: string, explorerId: number, value: number }>({
            query: ({ themeId, value, explorerId }) => ({
                url: `progress-app/themes/${themeId}/marks/`,
                method: 'POST',
                body: {
                    explorerId,
                    value,
                },
            }),
            invalidatesTags: ['getExplorersWaitingThemeMark'],
        }),
    }),
});

export const {
    useGetThemeByThemeIdQuery,
    useGetExplorersWaitingThemeMarkQuery,
    useSendThemeMarkMutation,
} = themeApi;