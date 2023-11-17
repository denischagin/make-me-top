import { SystemsList } from '@widgets/SystemsList';
import { getUrlThemeByCourseId } from '@shared/constants/links';
import { bem } from '@shared/utils/helpers/bem';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';
import { useNavigate } from 'react-router-dom';

export const ExplorerCompletedSystems = () => {
	const [, element] = bem('explorer');
	
	const navigate = useNavigate()
	
	const {
		data: userInfo,
	} = useGetExplorerProfileQuery();
	
	return (
		<>
			<div className={element('completed-systems')}>
				<SystemsList
					heading="Освоенные системы"
					systems={userInfo?.investigatedSystems ?? []}
					onSystemClick={(systemId) => navigate(getUrlThemeByCourseId({ courseId: systemId }))}
				/>
			</div>
		</>
	);
};