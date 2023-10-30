
export interface RejectCoursePayloadInterface {}

export interface RequestCourseParamsInterface {
    requestId: number;
}

export interface RequestCourseBodyInterface {
    approved: boolean;
}

export interface CourseInfoResponse {
    course?: Course;
    you?: CourseExplorer;
    yourKeeper?: CourseKeeper;
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

export interface CurrentCourseRequestInterface {
    requestId: number
    courseId: number
    personId: number
    statusId: number
}