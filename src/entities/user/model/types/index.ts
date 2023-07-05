import { UserInterface } from '@shared/types/common';

export interface UserState {
    isRegistered: boolean;
    isModalOpen: boolean;
    planetList: Array<ModalPlanetInterface>;
    explorersList: Array<UserInterface>;
    curatorsList: Array<UserInterface>;
    userInfo: UserInterface;
}

export interface ModalPlanetInterface {
    planetId: number;
    planetName: string;
    systemId: number;
}

export interface userDataInterface {
    login: string
    password: string
}

export interface AuthLoginInterface {
    payload: userDataInterface
    callback: () => void
}
