export interface ReviewInterface {
    planet: string;
    rating: number | null;
    name: string;
    avatar: string;
    comment: string;
    id?: number;
}

export interface KeeperState {
    isKeeper: boolean;
    keeperInfo: KeeperInfoInterface
    keeperCardInfo: KeeperCardInfoInterface
    keepersList: KeepersFilterInterface[]
}

export interface KeeperInfoInterface {
    person: Person;
    rating?: number | null;
    totalSystems: number;
    totalExplorers: number;
    studyingExplorers: Array<StudyingExplorersInterface>;
    studyRequests: Array<StudyRequestsInterface>;
    finalAssessments: Array<FinalAssessmentsInterface>;
    reviewRequests: Array<ReviewRequestsInterface>;
}


export interface KeepersFilterInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    rating: number;
    systems: number[];
    galaxyId: number;
    galaxyName: string;
}

export interface Person {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    registrationDate: string;
}

export interface StudyingExplorersInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
    courseId: number;
}

export interface StudyRequestsInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    courseId: number;
    courseTitle: string;
    requestId: number;
    galaxyName: string;
}

export interface FinalAssessmentsInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    courseId: number;
    courseTitle: string;
    explorerId: number;
}

export interface ReviewRequestsInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    courseId: number;
    courseTitle: string;
    requestId: number;
    explorerId: number;
    courseThemeId: number;
    courseThemeTitle: string;
}

export interface KeeperCardInfoInterface {
    person: Person
    rating: number | null
    totalSystems: number
    totalExplorers: number
    systems: Array<System>
    feedback: Array<Feedback>
}

export interface System {
    courseId: number
    title: string
    rating: number | null
    keeperId: number
}

export interface Feedback {
    personId: number
    firstName: string
    lastName: string
    patronymic: string
    explorerId: number
    courseId: number
    courseTitle: string
    rating: number | null
    comment: string
}
