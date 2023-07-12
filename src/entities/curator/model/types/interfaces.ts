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
    rating?: null;
    totalSystems: number;
    totalExplorers: number;
    studyingExplorers?: Array<StudyingExplorersEntity> | null;
    studyRequests?: Array<StudyRequestsEntity> | null;
    finalAssessments?: Array<FinalAssessmentsEntity> | null;
    reviewRequests?: Array<ReviewRequestsEntity> | null;
}

export interface Person {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    registrationDate: string;
}

export interface StudyingExplorersEntity {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
    courseId: number;
}

export interface StudyRequestsEntity {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    courseId: number;
    courseTitle: string;
    requestId: number;
}

export interface FinalAssessmentsEntity {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    courseId: number;
    courseTitle: string;
    explorerId: number;
}

export interface ReviewRequestsEntity {
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