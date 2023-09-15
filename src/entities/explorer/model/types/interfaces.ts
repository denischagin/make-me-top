import {
    ReviewRequestsInterface,
    StudyRequestsInterface,
} from '@entities/keeper/model/types/interfaces';

export interface ExplorerState {
    isExplorer: boolean;
    isSystemActive: boolean
    explorerApplicationCard: ExplorerApplicationCardInterface
    explorerInfo: ExplorerInfoInterface
    explorerCardInfo: ExplorerCardInfoInterface
    explorersList: ExplorersFilterInterface[]
    isError: boolean
}

export interface ExplorersFilterInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    rating: number;
    systems: number[];
    galaxyId: number;
    galaxyName: string;
    currentCourseId?: number;
    currentCourseName?: string;
}

export interface ExplorerApplicationCardInterface {
    system: string
    planet: string
}

export interface ExplorerInfoInterface {
    person: Person;
    rating?: number | null;
    totalSystems: number;
    currentSystem: CurrentSystem;
    investigatedSystems: Array<InvestigatedSystemsInterface>;
    studyRequest: StudyRequestCabinetInterface
    ratingTable: Array<PersonRating>;
}

export interface Person {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    registrationDate: string;
}

export interface PersonRating {
    firstName: string
    lastName: string
    patronymic: string
    personId: number
    rating: number
}

export interface CurrentSystem {
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
    keeperId: number;
}

export interface ExplorerCardInfoInterface {
    person: Person
    rating: number | null
    totalFeedback: number
    totalSystems: number
    currentSystem: CurrentSystem
    investigatedSystems: Array<InvestigatedSystemsInterface>
    studyRequest: StudyRequestsInterface
    feedback: Array<Feedback>
    reviewRequest: ReviewRequestsInterface
}

export interface StudyRequestCabinetInterface {
    courseId: string
    courseTitle: string
    galaxyId: string
    galaxyName: string
    keeperFirstName: string
    keeperId: number
    keeperLastName: string
    keeperPatronymic: string
    keeperPersonId: number
    requestId: number
}

export interface Feedback {
    personId: number
    firstName: string
    lastName: string
    patronymic: string
    keeperId: number
    courseId: number
    courseTitle: string
    rating: number | null
    comment: string
}
