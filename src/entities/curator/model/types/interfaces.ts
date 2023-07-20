export interface ReviewInterface {
    planet: string;
    rating: number;
    name: string;
    avatar: string;
    comment: string;
    id?: number;
}

export interface CuratorState {
    isCurator: boolean;
    reviews: Array<ReviewInterface>;
    curatorInfo: KeeperInfoInterface
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