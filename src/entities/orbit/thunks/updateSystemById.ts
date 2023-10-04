import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';
import { onErrorHandler } from '@shared/api';


interface UpdateSystemPayload {
    systemName: string;
    systemLevel: number;
    systemPosition: number;
    orbitId: number;
}

interface UpdateSystemParams {
    systemId: number;
    galaxyId: number;
}

export const updateSystem = async (
    params: UpdateSystemParams,
    payload: UpdateSystemPayload,
) => {
    try {
        const { systemId, galaxyId } = params;

        const { data } = await instance.put<ErrorInterface>(
            `${URL_MMT_STAND}galaxy-app/${galaxyId}/system/${systemId}`,
            payload,
        );

        return data;
    } catch (err) {
        throw onErrorHandler({
            err,
        });
    }
};
