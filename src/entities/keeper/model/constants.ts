export const DEFAULT_ERROR_MESSAGE = 'Ошибка получения информации о хранителе';

export const initialKeeperInfo = {
    person: {
        personId: 0,
        firstName: '',
        lastName: '',
        patronymic: '',
        registrationDate: '',
    },
    rating: null,
    totalSystems: 0,
    totalExplorers: 0,
    studyingExplorers: [],
    studyRequests: [],
    finalAssessments: [],
    reviewRequests: [],
};

export const initialKeeperCardInfo = {
    person: {
        personId: 0,
        firstName: '',
        lastName: '',
        patronymic: '',
        registrationDate: '',
    },
    rating: 0,
    totalSystems: 0,
    totalExplorers: 0,
    systems: [],
    feedback: [],
};

export const initialKeepersList = [];