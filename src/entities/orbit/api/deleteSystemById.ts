import toast from 'react-hot-toast';
import { AxiosError } from 'axios/index';

import { DEFAULT_ERROR_MESSAGE } from '@entities/galaxy/model/constants';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_GALAXY } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

interface DeleteSystemById {
    systemId: number,
}

export const deleteSystemById = async (payload: DeleteSystemById) => {
    try {
        const {
            systemId,
        } = payload;

        const {
            data,
        } = await instance.delete<ErrorInterface>(`${URL_MMT_STAND_GALAXY}/galaxy-app/system/${systemId}`);

        if (data.message) {
            toast.error(data.message);
        }

        return data;
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as AxiosError<ErrorInterface>;

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
};