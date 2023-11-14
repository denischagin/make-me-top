import { baseApi } from '@shared/api/baseApi';
import { GetThemeByThemeIdResponse } from '@entities/theme';

export const themeApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getThemeByThemeId: builder.query<GetThemeByThemeIdResponse, number>({
			query: (themeId) => ({
				url: `course-app/themes/${themeId}`
			}),
			providesTags: ['getThemeById'],
		})
	})
});

export const { useGetThemeByThemeIdQuery } = themeApi;