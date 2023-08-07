import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { DEFAULT_ERROR_MESSAGE } from '@entities/galaxy/model/constants';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

interface UpdateSystemPayload {
    systemName: string,
    systemLevel: number,
    systemPosition: number,
    orbitId: number,
}

interface UpdateSystemParams {
    systemId: number,
    galaxyId: number,
}

export const updateSystem = async (params: UpdateSystemParams, payload: UpdateSystemPayload) => {
    try {
        const {
            systemId,
            galaxyId,
        } = params;

        const {
            data,
        } = await instance.put<ErrorInterface>(`${URL_MMT_STAND}galaxy-app/${galaxyId}/system/${systemId}`, payload);

        return data;
    }
    catch (err) {
        const error: AxiosError<ErrorInterface> = err as AxiosError<ErrorInterface>;

        if (error.response) {
            throw toast.error(error.response.data.errorMessage);
        }

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
};