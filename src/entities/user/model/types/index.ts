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
    explorersList: Array<UserInterface>;
    keepersList: Array<UserInterface>;
    userInfo: UserInterface;
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