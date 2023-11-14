import {
	ApprovedCourseRequestInterface,
	CourseInfoResponse, CourseResponse,
	CurrentCourseRequestInterface,
	RequestCourseBodyInterface,
	RequestCourseParamsInterface,
} from '@entities/course/model/types/api';
import { baseApi } from '@shared/api/baseApi';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/error';
import { TOAST_SUCCESS_REJECTED } from '@shared/constants/toastTitles';
import { ErrorInterface, PostCourseRequest } from '@shared/types/common';
import toast from 'react-hot-toast';

export const courseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		acceptCourseRequest: builder.mutation<
			ErrorInterface,
			RequestCourseParamsInterface
		>({
			query: ({ requestId }) => ({
				url: `course-registration-app/course-requests/${requestId}`,
				method: 'PATCH',
				body: {
					approved: true,
				} as RequestCourseBodyInterface,
			}),
			invalidatesTags: ['getExplorerCardInfo', 'getKeeperProfile'],
		}),
		
		rejectCourseRequest: builder.mutation<
			ErrorInterface,
			RequestCourseParamsInterface
		>({
			query: ({ requestId }) => ({
				url: `course-registration-app/course-requests/${requestId}`,
				method: 'PATCH',
				body: {
					approved: false,
				} as RequestCourseBodyInterface,
			}),
			
			invalidatesTags: ['getExplorerCardInfo', 'getKeeperProfile'],
		}),
		
		leaveCourseByExplorerId: builder.mutation<ErrorInterface, number>({
			query: (explorerId) => ({
				url: `person-app/explorers/${explorerId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['getExplorerProfile', 'getExplorerCardInfo'],
		}),
		
		closeCourseRequest: builder.mutation<ErrorInterface, number>({
			query: (requestId: number) => ({
				url: `course-registration-app/course-requests/${requestId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['getExplorerProfile'],
		}),
		
		postCourseRequest: builder.mutation<ErrorInterface, PostCourseRequest>({
			query: (body) => ({
				url: 'course-registration-app/course-requests/',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['getExplorerProfile'],
		}),
		
		getCourseInfoByCourseId: builder.query<CourseResponse, number>({
			query: (courseId) => ({
				url: `course-app/courses/${courseId}`,
			}),
			providesTags: ['getCourseInfoByCourseId'],
		}),
		
		getCourseInfoByCourseIdDetailed: builder.query<CourseInfoResponse, number>({
			query: (courseId) => ({
				url: `course-app/courses/${courseId}`,
				params: {
					detailed: true,
				},
			}),
			providesTags: (result) =>
				result
					? [
						{
							type: 'getCourseInfoByCourseId',
							id: result.course?.courseId,
						},
						'getCourseInfoByCourseId',
					]
					: ['getCourseInfoByCourseId'],
		}),
		getCurrentCourseRequest: builder.query<
			CurrentCourseRequestInterface,
			void
		>({
			query: () => `course-registration-app/course-requests/processing/`,
			extraOptions: {
				withOutToasts: true
			},
		}),
		
		startEducationOnCourse: builder.mutation<void, number>({
			query: (courseId) => ({
				url: `course-registration-app/courses/${courseId}/`,
				method: 'POST',
			}),
			invalidatesTags: ['getKeeperProfile']
		}),
		
		addHomework: builder.mutation<void, { groupId: string | number, themeId: string | number }>({
			query: (args) => ({
				url: `course-registration-app/courses/${args.themeId}/`,
				method: 'POST',
			})
		})
		
	}),
});

export const {
	useCloseCourseRequestMutation,
	usePostCourseRequestMutation,
	useLeaveCourseByExplorerIdMutation,
	useAcceptCourseRequestMutation,
	useRejectCourseRequestMutation,
	useGetCourseInfoByCourseIdDetailedQuery,
	useGetCourseInfoByCourseIdQuery,
	useGetCurrentCourseRequestQuery,
	useStartEducationOnCourseMutation,
} = courseApi;
