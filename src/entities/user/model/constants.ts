//дефолтное присваивание id планеты
export const DEFAULT_ID = 1;

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