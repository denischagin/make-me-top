import { Dispatch } from 'react';
import { AnyAction } from 'redux';

import { AppDispatch } from '@app/providers/store';

import { roles } from '@shared/constants/storageKeys';

export interface StudiedSystems {
    systemId: number;
    progress: number;
}

export interface PostUser {
    username: string;
}

export interface UserState {
    isModalOpen: boolean;
}

export interface ModalPlanetInterface {
    planetId: number;
    planetName: string;
    systemId: number;
    planetNumber: number;
}

export interface userDataInterface {
    login: string;
    password: string;
    role: roles;
}

export interface AuthLoginInterface {
    payload: userDataInterface;
    callback: () => void;
    // dispatch: any
}
