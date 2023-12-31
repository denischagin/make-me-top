export interface RejectCoursePayloadInterface {
}

export interface AcceptCourseParamsInterface {
    requestId: number;
}

export interface RejectCourseParamsInterface {
    requestId: number;
    reasonId: number;
}

export interface RequestCourseBodyInterface {
    approved: boolean;
}

export interface CourseResponse extends Course {

}

export interface CourseInfoResponse {
    course?: Course;
    you?: CourseExplorer;
    yourKeeper?: CourseKeeper;
    explorers: Array<CourseExplorer> | null;
    keepers: Array<CourseKeeper> | null;
    mark?: number;
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

export interface CourseKeeper extends CourseUser {
    keeperId: number;
}

export interface CurrentCourseRequestInterface {
    requestId: number;
    courseId: number;
    personId: number;
    statusId: number;
}

export interface ApprovedCourseRequestInterface {

}

export interface ExplorerWithGroupInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
    courseId: number;
    groupId: number;
}

export interface GetKeeperCurrentGroupInterface {
    groupId: number;
    courseId: number;
    keeperId: number;
    courseTitle: string;
    explorers: ExplorerWithGroupInterface[];
}

export interface GetExplorerProgressResponseInterface {
    explorerId: number;
    groupId: number;
    currentThemeId: number;
    progress: ExplorerProgressInterface;
    mark?: number;
}

export interface ExplorerProgressInterface {
    courseId: number;
    title: string;
    planets: ExplorerProgressPlanetInterface[];
}

export interface ExplorerProgressPlanetInterface {
    courseThemeId: number;
    title: string;
    courseThemeNumber: number;
    completed: boolean;
}

export interface RejectionReasonInterface {
    reasonId: number;
    name: string;
}

export type GetKeeperRejectionReasons = RejectionReasonInterface[]
