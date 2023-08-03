import { ReactNode } from 'react';

import {
    CourseExplorer,
    CourseKeeper,
} from '@entities/user/model/types';

export interface TabInterface {
    name: string;
    id: number;
}

export interface UserInfoInterface {
    fullname: string
    rating?: number | null;
}

export interface UserInterface {
    name: string;
    avatar: string;
    planets?: number;
    explorers?: number;
    stars?: number;
    reviews?: number;
    rating?: number | null;
    id: number;
}

export interface UserListInterface {
    keepersList?: Array<CourseKeeper> | null;
    explorersList?: Array<CourseExplorer> | null;
}

export interface ExplorerItemInterface {
    name: string;
    avatar: string;
    id?: number;
}

export interface EducationApplicationInterface {
    name: string;
    avatar: string;
    planet: string;
    rating?: number | null;
    id?: number;
}

export interface GradeApplicationInterface {
    name: string;
    avatar: string;
    star: string;
    planet: string;
    rating?: number | null;
    id?: number;
}

export interface ReviewCardInterface {
    review: ReviewInterface;
}

export interface ReviewInterface {
    personId: number
    firstName: string
    lastName: string
    patronymic: string
    explorerId?: number
    courseId: number
    courseTitle: string
    rating: number | null
    comment: string
}

export interface ReviewModalInterface {
    children: ReactNode;
    onClose: () => void;
}

export interface ErrorInterface {
    timestamp: string
    errorCode: string
    errorMessage: string
}

export enum SystemProgressTypes {
    SYSTEM_CLOSE = 'systemClose',
    SYSTEM_OPEN = 'systemOpen',
    SYSTEM_EDUCATION = 'systemEducation',
    PROGRESS_NOT_FOUND = 'progressNotFound'
}

export interface PostCourseInterface {
    payload: PostCourseRequest
    callback: () => void
}
export interface PostCourseRequest {
    courseId: number,
    keeperId: number,
}