import { AxiosError } from 'axios';

import { ErrorInterface } from '../../types/common';

export const noAuthHandler = (error: AxiosError<ErrorInterface>) => {}
