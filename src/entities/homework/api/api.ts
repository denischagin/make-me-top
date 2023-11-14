import { baseApi } from '@shared/api/baseApi';

export const homeworkApi = baseApi.injectEndpoints(({
	overrideExisting: false,
	endpoints: (builder) => ({
		getHomeworks: builder.query<unknown, { themeId: string, groupId: string }>({
			query: ({ themeId, groupId }) => `homework-app/themes/${themeId}/groups/${groupId}/homeworks/`
		})
	})
}));