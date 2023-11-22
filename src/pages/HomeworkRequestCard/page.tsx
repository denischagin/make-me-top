import React, { useEffect, useState } from 'react';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { bem } from '@shared/utils/helpers/bem';
import { Container } from '@shared/ui/Container';
import './styles.scss';
import { SendGradeAndRemark } from '@widgets/SendGradeAndRemark/ui/SendGradeAndRemark';
import { HomeworkRequests } from '@widgets/HomeworkRequests';
import { ArrowButton } from '@shared/ui/ArrowButton';
import { arrowButtonDirection } from '@shared/ui/ArrowButton/interfaces';

const HomeworkRequestCardPage = () => {
	const [block, element] = bem('homework-request-page');
	const [isScrollFromBottom, setIsScrollFromBottom] = useState(false);
	
	const handleScrollToBottom = () => {
		window.scroll({
			top: document.documentElement.scrollHeight,
			behavior: 'smooth',
		});
	};
	
	const handleScrollToTop = () => {
		window.scroll({
			top: 0,
			behavior: 'smooth',
		});
	};
	
	const isShowScrollButton = window.innerHeight - document.documentElement.scrollHeight < 0
	
	useEffect(() => {
		const handleScroll = () => {
			const indent = 300;
			const { scrollHeight, scrollTop } = document.documentElement;
			
			if (scrollHeight - scrollTop - window.innerHeight < indent)
				return setIsScrollFromBottom(true);
			
			setIsScrollFromBottom(false);
		};
		
		addEventListener('scroll', handleScroll);
		
		return () => removeEventListener('scroll', handleScroll);
	}, []);
	
	return (
		<div>
			<BackgroundProfile />
			<Header />
			<div className={block()}>
				<Container>
					<div className={element('content')}>
						<SendGradeAndRemark />
						<HomeworkRequests />
						
						{
							isShowScrollButton
							&& (isScrollFromBottom
								? <ArrowButton
									direction={arrowButtonDirection.top}
									className={element('button-scroll')}
									onClick={handleScrollToTop}
								/> :
								<ArrowButton
									direction={arrowButtonDirection.bottom}
									className={element('button-scroll')}
									onClick={handleScrollToBottom}
								/>)
						}
					</div>
				</Container>
			</div>
		</div>
	);
};

export default HomeworkRequestCardPage;