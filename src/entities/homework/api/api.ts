import { baseApi } from '@shared/api/baseApi';
import { GetHomeworksType } from '@entities/homework/model/types/api';

export const homeworkApi = baseApi.injectEndpoints(({
	overrideExisting: false,
	endpoints: (builder) => ({
		getHomeworks: builder.query<GetHomeworksType, { themeId: string, groupId: string }>({
			query: ({ themeId, groupId }) => `homework-app/themes/${themeId}/groups/${groupId}/homeworks/`
		})
	})
}));

export const { useGetHomeworksQuery } = homeworkApi;