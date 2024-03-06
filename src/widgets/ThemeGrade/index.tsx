import { bem, getUserFullName } from '@shared/utils';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { useGetExplorersWaitingThemeMarkQuery } from '@entities/theme';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';
import { Fragment, useEffect, useState } from 'react';
import { GradeRadioButtonSection } from '@shared/ui/GradeRadioButtonSection';
import './styles.scss';
import { SendThemeMarkButton } from '@features/send-theme-mark';

export const ThemeGrade = () => {
    const [block, element] = bem('theme-grade');
    const { themeId } = useParams();
    const [activeExplorerIdToGrade, setActiveExplorerIdToGrade] = useState<number | null>(null);
    const [currentMark, setCurrentMark] = useState<number | null>(null);

    const { data: explorersWaiting } = useGetExplorersWaitingThemeMarkQuery(themeId ?? skipToken);

    const handleSelectExplorerToGrade = (explorerId: number) => () => {
        if (explorerId === activeExplorerIdToGrade)
            return setActiveExplorerIdToGrade(null);

        setActiveExplorerIdToGrade(explorerId);
    };

    const handleSelectCurrentMark = (mark: number | null) => {
        setCurrentMark(mark);
    };

    useEffect(() => {
        return () => {
            setActiveExplorerIdToGrade(null);
            setCurrentMark(null);
        };
    }, [themeId]);

    if (!explorersWaiting || explorersWaiting.length === 0 || !themeId) return null;

    return (
        <div className={block()}>
            <Typography variant={typographyVariant.h2}>
                Выставление оценки за тему
            </Typography>

            {explorersWaiting?.map(({ explorerId, ...user }) => (
                <Fragment
                    key={explorerId}
                >
                    <div
                        className={element('card', {
                            active: explorerId === activeExplorerIdToGrade,
                        })}>
                        <Card
                            size={cardSize.small}
                        >
                            <div
                                className={element('card-content')}
                            >
                                <Avatar size={avatarSize.small} personId={user.personId} />

                                <Typography variant={typographyVariant.medium16} className={element('name')}>
                                    {getUserFullName(user)}
                                </Typography>

                                <Button
                                    title={'Выставить'}
                                    size={buttonSize.small}
                                    color={buttonColor.filled}
                                    onClick={handleSelectExplorerToGrade(explorerId)}
                                    className={element('button-extra')}
                                />
                            </div>
                        </Card>
                    </div>
                    {explorerId === activeExplorerIdToGrade && (
                        <div className={element('grade-section')}>
                            <GradeRadioButtonSection currentGrade={currentMark} onChange={handleSelectCurrentMark} />

                            {currentMark && (
                                <SendThemeMarkButton value={currentMark} explorerId={activeExplorerIdToGrade} />
                            )}
                        </div>
                    )}

                </Fragment>
            ))}


        </div>
    );
};