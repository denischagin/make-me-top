import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { DEFAULT_ERROR_MESSAGE } from '@entities/galaxy/model/constants';
import { SystemType } from '@entities/galaxy/model/types';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND_GALAXY } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

interface FetchSystemById {
  id: number;
}

export interface SystemResponseInterface extends SystemType, ErrorInterface {}

export const fetchSystemById = async (payload: FetchSystemById) => {
    try {
        const {
            id,
        } = payload;

        const {
            data,
        } = await instance.get<SystemResponseInterface>(`${URL_MMT_STAND_GALAXY}/galaxy-app/system/${id}`);

        if (data.message) {
            toast.error(data.message);
            // использование без createAsyncThunk не позволяет вернуть rejectWithValue(data)
        }

        return data;
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as AxiosError<ErrorInterface, any>;

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
};
