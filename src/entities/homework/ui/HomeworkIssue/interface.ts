import { HomeworkInterfaceExplorer } from '@entities/homework/model/types/api';
import { MouseEventHandler } from 'react';

export interface HomeworkIssueProps extends HomeworkInterfaceExplorer {
    alreadyHaveMarkOnTheme?: boolean;
    homeworkIndex: number;
    onHomeworkClick: MouseEventHandler<HTMLButtonElement>;
}