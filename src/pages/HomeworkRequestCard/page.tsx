import React, { useEffect, useState } from 'react';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { bem } from '@shared/utils/helpers/bem';
import { Container } from '@shared/ui/Container';
import './styles.scss';
import { SendGradeAndRemark } from '@widgets/SendGradeAndRemark/ui/SendGradeAndRemark';
import { HomeworkRequests } from '@widgets/HomeworkRequests';
import { ArrowButton } from '@shared/ui/ArrowButton';
import { arrowButtonDirection, arrowButtonVariant } from '@shared/ui/ArrowButton/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { ButtonScrollTopBottom } from '@features/ButtonScrollTopBottom';

const HomeworkRequestCardPage = () => {
	const [block, element] = bem('homework-request-page');
	
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
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cupiditate dicta,
								explicabo ipsa modi odio, officia omnis possimus quod recusandae suscipit tempora ullam!
								Ab aliquid asperiores eveniet, labore nostrum officia!
							</Typography>
						</div>
						
						<SendGradeAndRemark />
						<HomeworkRequests />
					</div>
				</Container>
			</div>
		</div>
	);
};

export default HomeworkRequestCardPage;