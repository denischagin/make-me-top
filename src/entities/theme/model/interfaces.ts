export interface ThemeInterface {
    courseThemeId: number,
    title: string,
    lastModified: string,
    description: string,
    content: string,
    courseThemeNumber: number,
    courseId: number
}

export interface ExplorerWaitingMark {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
    courseId: number;
    groupId: number;
}