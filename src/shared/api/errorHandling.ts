import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { ErrorInterface } from '@shared/types/common';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/error';


export interface onErrorHandlerArgs {
    err: unknown;
    errorMessage?: string;
    withRejectValue?: boolean;
}

export const onErrorHandler = ({
    errorMessage = DEFAULT_ERROR_MESSAGE,
    err,
}: onErrorHandlerArgs) => {
    const error: AxiosError<ErrorInterface> = err as any;

    noAuthHandler(error);

    if (error.response) {
        toast.error(error.response.data.errorMessage);

        return error.response.data;
    }

    throw toast.error(errorMessage);
};
