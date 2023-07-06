import { Simulate } from 'react-dom/test-utils';
import toast from 'react-hot-toast';
import axios,
{
    AxiosError,
} from 'axios';

import { DEFAULT_ERROR_MESSAGE } from '@entities/galaxy/model/constants';
import { SystemType } from '@entities/galaxy/model/types';

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
        } = await axios.get<SystemResponseInterface>(`${process.env.REACT_APP_FETCH_URL}/galaxy-app/system/${id}`);

        if (data.message) {
            toast.error(data.message);

            // return data.message; // todo использование без createAsyncThunk не позволяет вернуть rejectWithValue(data)
        }

        return data;
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as any;

        throw toast.error(error.message || DEFAULT_ERROR_MESSAGE);
    }
};
