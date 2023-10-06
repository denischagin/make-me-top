import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { onErrorHandler } from '@shared/api';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';


interface CreateSystemPayload {
    systemName: string;
    systemLevel: number;
    systemPosition: number;
    description: string;
}

interface CreateSystemParams {
    orbitId: number;
}

export const createSystem = async (
    params: CreateSystemParams,
    payload: CreateSystemPayload,
) => {
    try {
        const {
            orbitId,
        } = params;

        const {
            data,
        } = await instance.post<ErrorInterface>(
            `${URL_MMT_STAND}galaxy-app/orbits/${orbitId}/systems`,
            payload,
        );

        return data;
    } catch (err) {
        throw onErrorHandler({
            err,
        });
    }
};
