import { UserInterface } from '@shared/types/common';


export type InProgressSystemType = {
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
    courseInfo: CourseInfoInterface;
    userData: UserProgress;
}

export type UserProgress = {
    openedSystemList: Array<number>,
    closedSystemList: Array<number>,
    inProgressSystemList: Array<InProgressSystemType>,
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

export interface CourseInfoInterface {
    course: Course;
    you: CourseExplorer;
    yourKeeper: CourseKeeper;
    explorers: Array<CourseExplorer> | null;
    keepers: Array<CourseKeeper> | null;
}

export interface Course {
    courseId: number;
    title: string;
    creationDate: string;
    lastModified: string;
    description: string;
}

export interface CourseExplorer {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
    rating: number;
}

export interface CourseKeeper {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    keeperId: number;
    rating: number;
}
