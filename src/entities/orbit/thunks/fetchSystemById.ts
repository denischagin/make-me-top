import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { DEFAULT_ERROR_MESSAGE } from '@entities/galaxy/model/constants';
import { SystemType } from '@entities/galaxy/model/types';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

interface FetchSystemById {
    id: number | null;
    withDependencies?: boolean;
    callback?: () => void;
}

export interface SystemResponseInterface extends SystemType, ErrorInterface {
}

export const fetchSystemById = async (payload: FetchSystemById) => {
    try {
        const {
            id,
            withDependencies,
            callback,
        } = payload;

        const fetchUrl = withDependencies
            ? `${URL_MMT_STAND}galaxy-app/system/${id}?withDependencies=true`
            : `${URL_MMT_STAND}galaxy-app/system/${id}`;

        const {
            data,
        } = await instance.get<SystemResponseInterface>(fetchUrl);

        callback && callback();

        return data;
    }
    catch (err) {
        const error: AxiosError<ErrorInterface> = err as AxiosError<ErrorInterface, any>;

        if (error.response) {
            throw toast.error(error.response.data.errorMessage);
        }

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
};