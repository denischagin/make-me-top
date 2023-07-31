//дефолтное присваивание id планеты
import { UserProgress } from '@entities/user/model/types';

export const DEFAULT_PLANET_ID = 1;
export const DEFAULT_ERROR_MESSAGE = 'Ошибка получения списка планет с сервера';
export const DEFAULT_USER_PROGRESS: UserProgress = {
    openedSystemList: [],
    closedSystemList: [],
    inProgressSystemList: [],
};