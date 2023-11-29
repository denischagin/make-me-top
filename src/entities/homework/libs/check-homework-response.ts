import {
	GetHomeworksType,
	HomeworkExplorerResponseType,
	HomeworkKeeperResponseType
} from '@entities/homework/model/types/api';
import { roles } from '@shared/constants/storageKeys';

export type TransformHomeworkResponseType<R extends keyof HomeworkResponseTypeMap> = HomeworkResponseTypeMap[R];

export type HomeworkResponseTypeMap = {
	'KEEPER': HomeworkKeeperResponseType;
	'EXPLORER': HomeworkExplorerResponseType;
};

export const transformHomeworkResponse = <R extends keyof HomeworkResponseTypeMap>(
	homework: GetHomeworksType | undefined,
	role: R
): TransformHomeworkResponseType<R> | undefined => {
	if (!homework) {
		return undefined;
	}
	
	if (role === 'EXPLORER') {
		if (homework && !Array.isArray(homework)) {
			return undefined;
			// throw new Error(`Невозможно ${JSON.stringify(homework)} привести к HomeworkExplorerResponseType`);
		}
		return homework as TransformHomeworkResponseType<R>;
	}
	
	if (role === 'KEEPER') {
		if (homework && !('activeHomeworks' in homework && 'closedHomeworks' in homework)) {
			return undefined;
			// throw new Error(`Невозможно ${JSON.stringify(homework)} привести к HomeworkKeeperResponseType`);
		}
		return homework as TransformHomeworkResponseType<R>;
	}
	
	return undefined;
};