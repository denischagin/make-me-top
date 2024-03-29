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
    keeperInfo: KeeperInfoInterface;
    keeperCardInfo: KeeperCardInfoInterface;
    keepersList: KeepersFilterInterface[];
}

export interface KeeperCourseAcceptedRequest {
    personId: number;
    requestId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    rating: number;
    responseDate: string;
}

export interface KeeperCourseGroupAcceptedRequests {
    courseTitle: string;
    courseId: number;
    requests: KeeperCourseAcceptedRequest[];
}

export interface KeeperCurrentGroupInterface {
    courseId: number;
    courseTitle: string;
    groupId: number;
    keeperId: number;
    explorers: StudyingExplorersInterface[];
}

interface SystemInterface {
    courseId: number,
    title: string,
    rating: number
}

export interface KeeperInfoInterface {
    person: Person;
    rating?: number | null;
    totalSystems: number;
    totalExplorers: number;
    studyingExplorers: Array<StudyingExplorersInterface>;
    studyRequests: StudyRequestGroupInterface[];
    finalAssessments: Array<FinalAssessmentsInterface>;
    reviewRequests: Array<ReviewRequestsInterface>;
    approvedRequests: KeeperCourseGroupAcceptedRequests[];
    currentGroup: KeeperCurrentGroupInterface;
    systems: SystemInterface[];
    keeperFeedbacks?: KeeperFeedback[];
}

export interface KeeperFeedback {
    personId: number;
    explorerId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    keeperId: number;
    courseId: number;
    courseTitle: string;
}


export interface GalaxyKeeperInterface {
    galaxyId: number;
    galaxyName: string;
    galaxyDescription: string;
}

export interface KeepersFilterInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    rating: number;
    systems: number[];
    galaxies: GalaxyKeeperInterface[];
}

export interface Person {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    registrationDate: string;
    maxExplorers: number;
    skype?: string
    phoneNumber?: string
    email?: string
    telegram?: string
}

export interface StudyingExplorersInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
    courseId: number;
    groupId: number;
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
    keeperId: number;
    rating: number;
    requestDate: string;
}

export interface StudyRequestGroupInterface {
    courseId: number;
    courseTitle: string;
    requests: StudyRequestsInterface[];
}

export type StudyRequestsGroupObject = Record<string, StudyRequestsInterface[]>


export interface FinalAssessmentsInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    courseId: number;
    courseTitle: string;
    explorerId: number;
    averageMark: number;
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
    homeworkId: number;
    courseThemeTitle: string;
    status: {
        statusId: number
        status: 'EDITING' | 'CHECKING' | 'CLOSED'
    };
}

export interface KeeperCardInfoInterface {
    person: Person;
    rating: number | null;
    totalSystems: number;
    totalExplorers: number;
    systems: Array<System>;
    feedback: Array<Feedback>;
}

export interface System {
    courseId: number;
    title: string;
    rating: number | null;
}

export interface Feedback {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
    courseId: number;
    courseTitle: string;
    rating: number | null;
    comment: string;
}
