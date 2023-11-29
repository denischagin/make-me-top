import { baseApi } from '@shared/api/baseApi';
import {
	CreateHomeworkArgsInterface,
	GetHomeworksType,
	UpdateHomeworkArgsInterface
} from '@entities/homework/model/types/api';
import * as url from 'url';

export const homeworkApi = baseApi.injectEndpoints(({
	overrideExisting: false,
	endpoints: (builder) => ({
		// getHomeworks: builder.query<GetHomeworksType, { themeId: string, groupId: string }>({
		// 	query: ({ themeId, groupId }) => `homework-app/themes/${themeId}/groups/${groupId}/homeworks/`,
		// 	providesTags: ['getHomeworks']
		// }),
		getHomeworks: builder.query<GetHomeworksType, { themeId: string }>({
			query: ({ themeId, }) => `homework-app/themes/${themeId}/homeworks/`,
			providesTags: ['getHomeworks']
		}),
		
		createHomework: builder.mutation<void, CreateHomeworkArgsInterface>({
			query: ({ themeId, groupId, content }) => ({
				url: `homework-app/themes/${themeId}/homeworks/`,
				body: {
					content,
					groupId
				},
				method: 'POST',
			}),
			invalidatesTags: ['getHomeworks']
		}),
		
		updateHomework: builder.mutation<void, UpdateHomeworkArgsInterface>({
			query: ({ homeworkId, groupId, content, courseThemeId }) => ({
				url: `homework-app/homeworks/${homeworkId}`,
				body: {
					courseThemeId,
					content,
					groupId
				},
				method: 'PUT',
			}),
			invalidatesTags: ['getHomeworks']
		}),
		
		deleteHomework: builder.mutation<void, { homeworkId: number }>({
			query: ({ homeworkId }) => ({
				url: `homework-app/homeworks/${homeworkId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['getHomeworks']
		}),
	})
}));

export const {
	useGetHomeworksQuery,
	useCreateHomeworkMutation,
	useUpdateHomeworkMutation,
	useDeleteHomeworkMutation,
} = homeworkApi;