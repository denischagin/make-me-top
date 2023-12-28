import { baseApi } from '@shared/api/baseApi';
import {
    CreateCourseRatingParamsInterface,
    CreateExplorerFeedbackParamsInterface,
    CreateKeeperFeedbackParamsInterface,
} from '@entities/feedback/model';

export const feedbackApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        rejectKeeperFeedbackOffer: builder.mutation<
            number,
            number | string
        >({
            query: (explorerId) => ({
                url: `feedback-app/keeper-feedbacks/offers/${explorerId}`,
                method: 'PATCH',
            }),

            invalidatesTags: ['getKeeperProfile'],
        }),

        rejectExplorerFeedbackOffer: builder.mutation<
            number,
            number | string
        >({
            query: (explorerId) => ({
                url: `feedback-app/explorer-feedbacks/offers/${explorerId}`,
                method: 'PATCH',
            }),

            invalidatesTags: ['getExplorerProfile'],
        }),

        rejectCourseFeedbackOffer: builder.mutation<
            number,
            number | string
        >({
            query: (explorerId) => ({
                url: `feedback-app/course-feedbacks/offers/${explorerId}`,
                method: 'PATCH',
            }),

            invalidatesTags: ['getExplorerProfile'],
        }),

        createCourseRating: builder.mutation<
            number,
            CreateCourseRatingParamsInterface
        >({
            query: (body) => ({
                url: `feedback-app/course-feedbacks`,
                method: 'POST',
                body,
            }),

            invalidatesTags: ['getExplorerProfile'],
        }),

        createExplorerFeedback: builder.mutation<
            number,
            CreateExplorerFeedbackParamsInterface
        >({
            query: (body) => ({
                url: `feedback-app/explorer-feedbacks/`,
                method: 'POST',
                body,
            }),

            invalidatesTags: ['getExplorerProfile'],
        }),

        createKeeperFeedback: builder.mutation<
            number,
            CreateKeeperFeedbackParamsInterface
        >({
            query: (body) => ({
                url: `feedback-app/keeper-feedbacks/`,
                method: 'POST',
                body,
            }),

            invalidatesTags: ['getKeeperProfile'],
        }),

    }),
});

export const {
    useRejectCourseFeedbackOfferMutation,
    useRejectExplorerFeedbackOfferMutation,
    useRejectKeeperFeedbackOfferMutation,
    useCreateExplorerFeedbackMutation,
    useCreateCourseRatingMutation,
    useCreateKeeperFeedbackMutation,
} = feedbackApi;