import { ExplorerInfoInterface } from "@entities/explorer/model/types/interfaces";

export const initialExplorerInfo: ExplorerInfoInterface = {
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
        groupId: 0,
        explorerId: 0,
    },
    studyRequest: {
        courseId: '',
        courseTitle: '',
        galaxyId: '',
        galaxyName: '',
        requestId: 0,
        keepers: []
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
        explorerId: 0,
        groupId: 0,
    },
    reviewRequest: {
        courseId: 0,
        courseThemeId: 0,
        courseThemeTitle: '',
        courseTitle: '',
        explorerId: 0,
        firstName: '',
        lastName: '',
        patronymic: '',
        personId: 0,
        requestId: 0,
    },
    studyRequest: {
        courseId: 0,
        courseTitle: '',
        firstName: '',
        keeperId: 0,
        lastName: '',
        patronymic: '',
        personId: 0,
        requestId: 0,
        galaxyName: '',
    },
    rating: null,
    totalFeedback: 0,
    totalSystems: 0,
    investigatedSystems: [],
    feedback: [],
};

export const initialExplorersList = [];
