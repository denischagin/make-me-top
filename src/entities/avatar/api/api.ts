import { baseApi } from '@shared/api/baseApi';

export const avatarApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: builder => ({
        setAvatar: builder.mutation<number, FormData>({
            query: (formData) => ({
                url: 'pics/',
                method: 'PUT',
                body: formData,
            }),
        }),

        deleteAvatar: builder.mutation<number, void>({
            query: () => ({
                url: 'pics/',
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useSetAvatarMutation, useDeleteAvatarMutation } = avatarApi;