import React, { ReactElement } from 'react';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { bem } from '@shared/utils/helpers/bem';
import { Container } from '@shared/ui/Container';
import './styles.scss';
import { SendGradeAndRemark } from '@widgets/SendGradeAndRemark/ui/SendGradeAndRemark';
import { HomeworkRequests } from '@widgets/HomeworkRequests';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { ButtonScrollTopBottom } from '@features/ButtonScrollTopBottom';
import { useAuth } from '@entities/viewer';
import { useGetHomeworkRequest } from '@entities/homework';
import { roles } from '@shared/constants/storageKeys';
import { SendHomeworkVersionForm } from '@widgets/SendHomeworkVersionForm';
import { GradeRadioButtonSection } from '@shared/ui/GradeRadioButtonSection';
import { GradeWithComment } from '@widgets/GradeWithComment';

const sendFormByRole: Record<roles, ReactElement> = {
	KEEPER: <SendGradeAndRemark />,
	EXPLORER: <SendHomeworkVersionForm />
};

const HomeworkRequestCardPage = () => {
	const [block, element] = bem('homework-request-page');
	const { role } = useAuth();

	const getHomeworkRequest = useGetHomeworkRequest();
	const requestsInfo = getHomeworkRequest?.data;

	return (
		<div>
			<BackgroundProfile />
			<Header />
			<ButtonScrollTopBottom />
			<div className={block()}>
				<Container>
					<div className={element('content')}>
						<div className={element('homework')}>
							<Typography variant={typographyVariant.h1}>
								Домашнее задание
							</Typography>

							<Typography className={element('homework-content')} variant={typographyVariant.regular16}>
								{requestsInfo?.content}
							</Typography>
						</div>

						{requestsInfo?.request?.status.status !== 'CLOSED' ?
							role && sendFormByRole[role] : <GradeWithComment />
						}
						<HomeworkRequests />
					</div>
				</Container>
			</div>
		</div>
	);
};

export default HomeworkRequestCardPage;