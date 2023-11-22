export interface HomeworkInterface {
	homeworkId: number;
	content: string;
	groupId: number;
}

export type GetHomeworksType = HomeworkInterface[]