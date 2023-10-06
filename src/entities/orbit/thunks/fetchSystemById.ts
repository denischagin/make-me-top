import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { SystemType } from '@entities/galaxy/model/types';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';
import { onErrorHandler } from '@shared/api';


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
            ? `${URL_MMT_STAND}galaxy-app/systems/${id}?withDependencies=true`
            : `${URL_MMT_STAND}galaxy-app/systems/${id}`;

        const {
            data,
        } = await instance.get<SystemResponseInterface>(fetchUrl);

        callback && callback();

        return data;
    }
    catch (err) {
        throw onErrorHandler({
            err,
        });
    }
};
