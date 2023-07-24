export const DEFAULT_ERROR_MESSAGE = 'Ошибка получения информации об исследователе';

export const initialExplorerInfo = {
    person: {
        personId: 0,
        firstName: '',
        lastName: '',
        patronymic: '',
        registrationDate: '',
    },
    currentSystem: {
        keeper: {
            personId: 0,
            firstName: '',
            lastName: '',
            patronymic: '',
            keeperId: 0,
        },
        courseThemeId: 0,
        courseThemeTitle: '',
        courseId: 0,
        courseTitle: '',
        progress: 0,
    },
    rating: null,
    totalSystems: 0,
    investigatedSystems: [],
    ratingTable: [],
};

export const initialExplorerCardInfo = {
    person: {
        personId: 0,
        firstName: '',
        lastName: '',
        patronymic: '',
        registrationDate: '',
    },
    currentSystem: {
        keeper: {
            personId: 0,
            firstName: '',
            lastName: '',
            patronymic: '',
            keeperId: 0,
        },
        courseThemeId: 0,
        courseThemeTitle: '',
        courseId: 0,
        courseTitle: '',
        progress: 0,
    },
    rating: null,
    totalFeedback: 0,
    totalSystems: 0,
    investigatedSystems: [],
    feedback: [],
};