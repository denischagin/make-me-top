import React from 'react';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { bem } from '@shared/utils/helpers/bem';
import { useParams } from 'react-router-dom';

const HomeworkRequestCardPage = () => {
	const [block, element] = bem('homework-request-page');
	
	const { homeworkRequestId, courseId, themeId } = useParams();
	
	return (
		<div>
			<BackgroundProfile />
			<Header />
			<div className={block()}>
			
			</div>
		</div>
	);
};

export default HomeworkRequestCardPage;