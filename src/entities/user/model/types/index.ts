import { UserInterface } from '@shared/types/common';


export type EducationSystemType = {
    systemId: number,
    completed: number,
}

export type PostUser = {
    username: string
}

export interface UserState {
    isRegistered: boolean;
    isModalOpen: boolean;
    planetList: Array<ModalPlanetInterface>;
    explorersList: Array<UserInterface>;
    curatorsList: Array<UserInterface>;
    userInfo: UserInterface;
    userData: UserProgress;
    userInfoData: UserDataInterface
}

export type UserProgress = {
    openSystemList: Array<number>,
    closeSystemList: Array<number>,
    educationSystemList: Array<EducationSystemType>,
}

export interface ModalPlanetInterface {
    planetId: number;
    planetName: string;
    systemId: number;
}

export interface userDataInterface {
    login: string
    password: string
    role: string
}

export interface AuthLoginInterface {
    payload: userDataInterface
    callback: () => void
}

export interface UserDataInterface {
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

