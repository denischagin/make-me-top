import { useParams } from 'react-router-dom';
import { useAuth } from '@entities/viewer';
import {
	useGetHomeworkRequestByHomeworkIdQuery,
	useGetHomeworkRequestByRequestIdQuery
} from '@entities/homework/api/api';
import { skipToken } from '@reduxjs/toolkit/query';
import { roles } from '@shared/constants/storageKeys';


export const useGetHomeworkRequest = () => {
	const { homeworkId, requestId } = useParams();
	const { role } = useAuth();
	
	const informationByHomeworkId = useGetHomeworkRequestByHomeworkIdQuery(homeworkId ?? skipToken, {
		skip: role !== 'EXPLORER'
	});
	const informationByRequestId = useGetHomeworkRequestByRequestIdQuery(requestId ?? skipToken, {
		skip: role !== 'KEEPER'
	});
	
	if (role === 'KEEPER') return informationByRequestId;
	if (role === 'EXPLORER') return informationByHomeworkId;
	
	return undefined;
};