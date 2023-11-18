import React, { useState } from 'react';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header/ui/Header';
import { bem } from '@shared/utils/helpers/bem';
import { useParams } from 'react-router-dom';
import { Container } from '@shared/ui/Container';
import { HomeworkRequestCard, HomeworkRequestList } from '@entities/homework';
import { HomeworkRequestCardVariant } from '@entities/homework/ui/HomeworkRequestCard/interface';
import System from '@shared/ui/System';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import './styles.scss';
import { GradeRadioButton } from '@shared/ui/GradeRadioButton';

const HomeworkRequestCardPage = () => {
    const [block, element] = bem('homework-request-page');

    const { homeworkRequestId, courseId, themeId } = useParams();

    const [currentGrade, setCurrentGrade] = useState<number | null>(null)

    const gradeList = [1, 2, 3, 4, 5];

    return (
        <div>
            <BackgroundProfile />
            <Header />
            <div className={block()}>
                <Container>
                    <Typography variant={typographyVariant.h1}>
                        Выставить оценку
                    </Typography>

                    <div className={element('grade-wrapper')}>
                        {gradeList.map((grade) => (
                            <GradeRadioButton
                                active={currentGrade === grade}
                                onClick={() => grade === currentGrade
                                    ? setCurrentGrade(null)
                                    : setCurrentGrade(grade)}>
                                {grade}
                            </GradeRadioButton>
                        ))}
                    </div>

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
                </Container>
            </div>
        </div>
    );
};

export default HomeworkRequestCardPage;