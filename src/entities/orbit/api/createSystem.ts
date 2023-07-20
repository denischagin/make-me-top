import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { DEFAULT_ERROR_MESSAGE } from '@entities/galaxy/model/constants';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_GALAXY } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

interface CreateSystemPayload {
    systemName: string,
    systemLevel: number,
    systemPosition: number,
    description: string,
    orbitId: number,
}

interface CreateSystemParams {
    galaxyId: number,
}

export const createSystem = async (params: CreateSystemParams, payload: CreateSystemPayload) => {
    try {
        const {
            galaxyId,
        } = params;

        const {
            data,
        } = await instance.post<ErrorInterface>(`${URL_MMT_STAND_GALAXY}/galaxy-ap/${galaxyId}/system`, payload);

        if (data.message) {
            toast.error(data.message);
        }

        return data;
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as AxiosError<ErrorInterface>;

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
};