import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithReauth } from '@shared/api/baseQuery';
import { queryTags } from '@shared/api/queryTags';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    keepUnusedDataFor: 30,
    refetchOnMountOrArgChange: 1,
    tagTypes: [...Object.values(queryTags)],
    endpoints: () => ({}),
});