import {
    ReviewRequestsInterface,
    StudyRequestsInterface,
} from '@entities/keeper/model/types/interfaces';

export interface ExplorerState {
    isExplorer: boolean;
    isSystemActive: boolean;
    explorerApplicationCard: ExplorerApplicationCardInterface;
    explorerInfo: ExplorerInfoInterface;
    explorerCardInfo: ExplorerCardInfoInterface;
    explorersList: ExplorersFilterInterface[];
    isError: boolean;
}

export interface GalaxyExplorerInterface {
    galaxyId: number;
    galaxyName: string;
    galaxyDescription: string
}

export interface ExplorersFilterInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    rating: number;
    systems: number[];
    galaxies: GalaxyExplorerInterface[]
}

export interface ExplorerApplicationCardInterface {
    system: string;
    planet: string;
}

export interface ExplorerInfoInterface {
    person: Person;
    rating?: number | null;
    totalSystems: number;
    currentSystem: CurrentSystem;
    investigatedSystems: Array<InvestigatedSystemsInterface>;
    studyRequest?: StudyRequestCabinetInterface;
    ratingTable: Array<PersonRating>;
    homeworkRequests?: HomeworkRequestInterface[];
}

export interface HomeworkRequestInterface {
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
    homeworkId: number;
    status: {
        statusId: number
        status: 'EDITING' | 'CHECKING' | 'CLOSED'
    };
}

export interface Person {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    registrationDate: string;
}

export interface PersonRating {
    firstName: string;
    lastName: string;
    patronymic: string;
    personId: number;
    rating: number;
}

export interface CurrentSystem {
    explorerId: number;
    groupId: number;
    courseThemeId: number;
    courseThemeTitle: string;
    courseId: number;
    courseTitle: string;
    keeper: Keeper;
    progress: number;
}

export interface Keeper {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    keeperId: number;
}

export interface InvestigatedSystemsInterface {
    courseId: number;
    title: string;
    rating: number | null;
}

export interface ExplorerCardInfoInterface {
    person: Person;
    rating: number | null;
    totalFeedback: number;
    totalSystems: number;
    currentSystem?: CurrentSystem;
    investigatedSystems: Array<InvestigatedSystemsInterface>;
    studyRequest: StudyRequestsInterface;
    feedback: Array<Feedback>;
    reviewRequests: ReviewRequestsInterface[];
}

export interface StudyRequestCabinetInterface {
    courseId: number;
    courseTitle: string;
    galaxyId: number;
    galaxyName: string;
    requestId: number;
    keepers: Keeper[];
}

export interface Feedback {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    keeperId: number;
    courseId: number;
    courseTitle: string;
    rating: number | null;
    comment: string;
}
