import toast from 'react-hot-toast';
import { AxiosError } from 'axios/index';


import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';
import { onErrorHandler } from '@shared/api';


interface DeleteSystemById {
    systemId: number;
}

export const deleteSystemById = async (payload: DeleteSystemById) => {
    try {
        const { systemId } = payload;

        const { data } = await instance.delete<ErrorInterface>(
            `${URL_MMT_STAND}galaxy-app/system/${systemId}`,
        );

        return data;
    } catch (err) {
        throw onErrorHandler({
            err,
        });
    }
};
