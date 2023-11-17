import { useNavigate } from 'react-router-dom';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { Typography } from '@shared/ui/Typography';

import { MasteringApplication } from '@entities/explorer';

import { bem } from '@shared/utils/helpers/bem';

import { getUrlThemeByCourseId, URL_GALAXY } from '@shared/constants/links';

import { ExplorerUserInfo } from '@widgets/ExplorerUserInfo';
import { Header } from '@widgets/Header/ui/Header';
import { RatingCard } from '@widgets/RatingCard';
import { SystemsList } from '@widgets/SystemsList';

import NotFound from '@pages/NotFound';

import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { TABS_LIST } from './model';

import './styles.scss';
import {
	useGetExplorerProfileQuery,
} from '@entities/explorer/api/api';

import Spinner from '@shared/ui/Spinner';
import { CurrentSystemCard } from '@widgets/CurrentSystemCard';
import { ExplorerCompletedSystems } from '@widgets/ExplorerCompletedSystems';

export const Explorer = () => {
	const [block, element] = bem('explorer');
	const navigate = useNavigate();
	
	const {
		data: userInfo,
		isSuccess,
		isError,
		isFetching,
		isLoading,
	} = useGetExplorerProfileQuery();
	
	if (isError) return <NotFound />;
	if (isLoading)
		return (
			<>
				<Header />
				<Spinner loading />
			</>
		);
	
	return (
		<>
			<BackgroundProfile />
			<div className={block()}>
				<Header />
				{isFetching && <Spinner loading />}
				{isSuccess && (
					<Container className={element('container')}>
						<div className={element('row', 'row')}>
							<div className={element('profile', 'col-xxl-9')}>
								<ExplorerUserInfo />
								
								<div className={element('current-system')}>
									<CurrentSystemCard tabsList={TABS_LIST} />
									<MasteringApplication />
								</div>
								
								<div className={element('button-galaxy')}>
									{(userInfo.currentSystem ||
										userInfo.studyRequest) && (
										<Button
											title="Переход на страницу с галактикой"
											size={buttonSize.large}
											color={buttonColor.filled}
											onClick={() =>
												navigate(`${URL_GALAXY}/${userInfo.studyRequest?.galaxyId}`)
											}
										/>
									)}
								</div>
								
								<ExplorerCompletedSystems />
							</div>
							
							<div className={element('rating', 'col-xxl-3')}>
								<Typography
									variant={typographyVariant.h2}
									className={element(
										'rating-heading',
										'mt-1 mb-4',
									)}
								>
									Рейтинг
								</Typography>
								<RatingCard />
							</div>
						</div>
					</Container>
				)}
			</div>
		</>
	);
};
