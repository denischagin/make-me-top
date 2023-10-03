import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { POST_COURSE_REQUEST } from '@entities/user/model/actions';
import { DEFAULT_ERROR_MESSAGE } from '@entities/user/model/constants';

import { instance } from '@shared/api/instances';

import { TOAST_REQUEST_SENT } from '@shared/constants/toastTitles';
import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface, PostCourseInterface } from '@shared/types/common';
import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

// вынести в сущность explorer, т.к. запрос не общий, а связан с конкретной сущностью
export const postCourseRequest = createAsyncThunk<
    ErrorInterface,
    PostCourseInterface
>(POST_COURSE_REQUEST, async ({ payload }) => {
    try {
        const { data } = await instance.post<ErrorInterface>(
            `${URL_MMT_STAND}explorer-cabinet/course-request`,
            payload,
        );

        toast.success(TOAST_REQUEST_SENT);

        return data;
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as any;

        noAuthHandler(error);

        if (error.response) {
            throw toast.error(error.response.data.errorMessage);
        }

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
});
