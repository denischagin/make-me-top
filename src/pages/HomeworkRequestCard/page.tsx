import React, { useState } from 'react';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { bem } from '@shared/utils/helpers/bem';
import { useParams } from 'react-router-dom';
import { Container } from '@shared/ui/Container';
import { HomeworkRequestCard, HomeworkRequestList } from '@entities/homework';
import { HomeworkRequestCardVariant } from '@entities/homework/ui/HomeworkRequestCard/interface';
import './styles.scss';
import { SendGradeAndRemark } from '@widgets/SendGradeAndRemark/ui/SendGradeAndRemark';

const HomeworkRequestCardPage = () => {
    const [block, element] = bem('homework-request-page');

    const { homeworkRequestId, courseId, themeId } = useParams();

    return (
        <div>
            <BackgroundProfile />
            <Header />
            <div className={block()}>
                <Container>
                    <div className={element('content')}>
                        <SendGradeAndRemark />

                        <HomeworkRequestList>
                            <HomeworkRequestCard
                                username={'Денис Чагин'}
                                content={'Молодец'}
                            />

                            <HomeworkRequestCard
                                variant={HomeworkRequestCardVariant.secondary}
                                username={'Тимур'}
                                content={'https://github.com/matvey/isExplorerSingleton.git'}
                            />

                            <HomeworkRequestCard
                                username={'Денис Чагин'}
                                content={'Не используй regEx, используй в данном случае синглтон, думаю самый лучший вариант'}
                            />

                            <HomeworkRequestCard
                                variant={HomeworkRequestCardVariant.secondary}
                                username={'Тимур'}
                                content={'https://github.com/matvey/isExplorerRegex.git'}
                            />
                        </HomeworkRequestList>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default HomeworkRequestCardPage;