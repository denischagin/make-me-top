//дефолтное присваивание id планеты
export const DEFAULT_ID = 1;
export const DEFAULT_ERROR_MESSAGE = 'Ошибка получения списка планет с сервера';

export const initialCourseInfo = {
    course: {
        courseId: 0,
        title: '',
        creationDate: '',
        lastModified: '',
        description: '',
    },
    you: {
        personId: 0,
        firstName: '',
        lastName: '',
        patronymic: '',
        explorerId: 0,
        rating: 0,
    },
    yourKeeper: {
        personId: 0,
        firstName: '',
        lastName: '',
        patronymic: '',
        keeperId: 0,
        rating: 0,
    },
    explorers: [],
    keepers: [],
};
export const DEFAULT_USER_PROGRESS = {
    openedSystemList: [],
    closedSystemList: [],
    inProgressSystemList: [],
};