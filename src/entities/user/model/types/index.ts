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
