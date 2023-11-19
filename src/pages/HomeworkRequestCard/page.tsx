import React, { useState } from 'react';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { bem } from '@shared/utils/helpers/bem';
import { useParams } from 'react-router-dom';
import { Container } from '@shared/ui/Container';
import { HomeworkRequestCard, HomeworkRequestCardGroup } from '@entities/homework';
import { HomeworkRequestCardVariant } from '@entities/homework/ui/HomeworkRequestCard/interface';
import './styles.scss';
import { SendGradeAndRemark } from '@widgets/SendGradeAndRemark/ui/SendGradeAndRemark';
import { HomeworkRequests } from '@widgets/HomeworkRequests';

const HomeworkRequestCardPage = () => {
    const [block, element] = bem('homework-request-page');

    return (
        <div>
            <BackgroundProfile />
            <Header />
            <div className={block()}>
                <Container>
                    <div className={element('content')}>
                        <SendGradeAndRemark />
                        <HomeworkRequests />
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default HomeworkRequestCardPage;