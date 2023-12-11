export interface HomeworkRequestMarkInterface {
    requestId: number;
    mark: number;
    comment: string;
}

export type RequestStatusType = 'CHECKING' | 'EDITING' | 'CLOSED'

export interface HomeworkInterfaceExplorer {
    homeworkId: number;
    title: string;
    content: string;
    groupId: number;
    status?: {
        statusId: number
        status: RequestStatusType
    };
    mark?: HomeworkRequestMarkInterface;
}

export interface HomeworkInterfaceGroupExplorer {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
}

export interface HomeworkInterfaceGroup {
    groupId: number;
    keeperId: number;
    courseId: number;
    explorers: HomeworkInterfaceGroupExplorer[];
}

export interface BaseHomeworkRequestInterface {
    requestId: number;
    homeworkId: number;
    status: RequestStatusInterface;
    requestDate: string;
}

export interface HomeworkExplorerInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    explorerId: number;
}

export interface HomeworkRequestWithExplorerInfo extends BaseHomeworkRequestInterface {
    explorer: HomeworkExplorerInterface;
}

export interface HomeworkKeeperInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    keeperId: number;
}

export interface HomeworkRequestFeedbackInterface {
    feedbackId: number;
    requestVersionId: number;
    comment: string;
    creationDate: string;
    keeper: HomeworkKeeperInterface;
}

export interface HomeworkVersionInterface {
    versionId: number,
    requestId: number,
    content: string,
    creationDate: string,
    explorer: HomeworkExplorerInterface,
    homeworkRequestFeedbacks: HomeworkRequestFeedbackInterface[]
}


export interface HomeworkRequestWithHomeworkVersion extends BaseHomeworkRequestInterface {
    explorerId: number;
    homeworkRequestVersions: HomeworkVersionInterface[];
    mark?: HomeworkRequestMarkInterface;
}


export interface RequestStatusInterface {
    statusId: number;
    status: RequestStatusType;
}


export interface BaseHomeworkInterface {
    homeworkId: number;
    content: string;
    title: string
}

export interface HomeworkInterface extends BaseHomeworkInterface {
    group: HomeworkInterfaceGroup;
    waitingRequestsCount: number;
    requests: HomeworkRequestWithExplorerInfo[];
    courseThemeId: number;
}

export type HomeworkExplorerResponseType = HomeworkInterfaceExplorer[]

export type HomeworkKeeperResponseType = {
    activeHomeworks: HomeworkInterface[];
    closedHomeworks: HomeworkInterface[];
}

export type GetHomeworksType = HomeworkExplorerResponseType | HomeworkKeeperResponseType

export interface GetHomeworkRequestsInterface extends BaseHomeworkInterface {
    request?: HomeworkRequestWithHomeworkVersion;
}

export interface UpdateHomeworkArgsInterface {
    courseThemeId: number,
    groupId: number,
    content: string,
    title: string
    homeworkId: number
}

export interface CreateHomeworkArgsInterface {
    themeId: number,
    groupId: number,
    content: string
    title: string
}

export interface SendHomeworkVersionArgsInterface {
    homeworkId: number,
    content: string
}

export interface SendHomeworkRequestFeedbackArgsInterface {
    requestId: number,
    content: string
}

export interface SendHomeworkMarkArgsInterface {
    comment: string;
    value: number;
    requestId: number,
}