import { baseApi } from '@shared/api/baseApi';

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

    }),
});

export const {
    useRejectCourseFeedbackOfferMutation,
    useRejectExplorerFeedbackOfferMutation,
    useRejectKeeperFeedbackOfferMutation,
} = feedbackApi;