export interface HomeworkInterfaceExplorer {
	homeworkId: number;
	content: string;
	groupId: number;
}

export type HomeworkExplorerResponseType = HomeworkInterfaceExplorer[]

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

export interface HomeworkInterfaceHomeworkRequest {
	requestId: number;
	homeworkId: number;
	explorer: {
		personId: number
		firstName: string
		lastName: string
		patronymic: string
		explorerId: number
	};
	requestDate: string;
	status: {
		statusId: number
		status: 'CHECKING' | 'EDITING' | 'CLOSED'
	};
}

export interface HomeworkInterfaceHomework {
	homeworkId: number;
	courseThemeId: number;
	content: string;
	group: HomeworkInterfaceGroup;
	waitingRequestsCount: number;
	requests: HomeworkInterfaceHomeworkRequest[];
}

export type HomeworkKeeperResponseType = {
	activeHomeworks: HomeworkInterfaceHomework[];
	closedHomeworks: HomeworkInterfaceHomework[];
}

export type GetHomeworksType = HomeworkExplorerResponseType | HomeworkKeeperResponseType

export interface UpdateHomeworkArgsInterface {
	courseThemeId: number,
	groupId: number,
	content: string,
	homeworkId: number
}

export interface CreateHomeworkArgsInterface {
	themeId: number,
	groupId: number,
	content: string
}