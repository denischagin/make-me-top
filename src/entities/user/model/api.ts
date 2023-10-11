import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithAuth } from '@shared/api';
import { queryTags } from '@shared/api/queryTags';
import { ErrorInterface, PostCourseRequest } from '@shared/types/common';

export const userApi = createApi({
    baseQuery: baseQueryWithAuth,
    tagTypes: [queryTags.getExplorerCabinet],
    endpoints: (builder) => ({
        postCourseRequest: builder.mutation<ErrorInterface, PostCourseRequest>({
            query: (body) => ({
                url: `course-registration-app/course-requests`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [queryTags.getExplorerCabinet],
        }),
    }),
});

// export const { usePostCourseRequestMutation } = userApi