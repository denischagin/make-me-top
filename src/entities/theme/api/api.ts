import { baseApi } from '@shared/api/baseApi';
import {
    GetExplorersWaitingThemeMarkResponse,
    GetExplorerThemesMarksResponse,
    GetThemeByThemeIdResponse,
    GetThemesWaitingExplorersMark,
} from '@entities/theme';


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
            providesTags: (_result, _error, arg) => ([{
                type: 'getExplorersWaitingThemeMark' as const,
                id: arg,
            }]),
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
            invalidatesTags: (_result, _error, arg) => ([
                { type: 'getExplorersWaitingThemeMark', id: arg.themeId },
                'getThemesWaitingExplorersMark',
                'getExplorerCardInfo',
            ]),
        }),

        getThemesWaitingExplorersMark: builder.query<GetThemesWaitingExplorersMark, void>({
            query: () => ({
                url: `progress-app/themes/marks/`,
            }),
            providesTags: ['getThemesWaitingExplorersMark'],
            extraOptions: {
                withOutToasts: true,
            },
        }),
        getExplorerThemesMarks: builder.query<GetExplorerThemesMarksResponse, number | string>({
            query: (courseId) => ({
                url: `progress-app/courses/${courseId}/themes/marks/`,
            }),
        }),
    }),
});

export const {
    useGetThemeByThemeIdQuery,
    useGetExplorersWaitingThemeMarkQuery,
    useSendThemeMarkMutation,
    useGetThemesWaitingExplorersMarkQuery,
    useGetExplorerThemesMarksQuery,
} = themeApi;
