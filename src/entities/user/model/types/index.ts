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
    courseInfo: CourseInfoInterface;
}

export interface ModalPlanetInterface {
    planetId: number;
    planetName: string;
    systemId: number;
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

export interface CourseInfoInterface {
    course?: Course;
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

export interface CourseUser {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    rating: number;
}

export interface CourseExplorer extends CourseUser {
    explorerId: number;
}

export interface CourseKeeper extends CourseUser{
    keeperId: number;
}
