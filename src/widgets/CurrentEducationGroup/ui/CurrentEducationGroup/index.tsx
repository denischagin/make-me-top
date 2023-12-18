import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { MouseEventHandler, useState } from 'react';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import './styles.scss';
import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { useNavigate } from 'react-router-dom';
import { getUrlExplorerById, getUrlThemeByCourseId } from '@shared/constants/links';
import { RouterLink } from '@shared/ui/RouterLink';
import { ExpelButton } from '@features/expel';

export const CurrentEducationGroup = () => {
    const [block, element] = bem('current-education-group');
    const [active, setActive] = useState(false);

    const navigate = useNavigate();

    const { data: userInfo } = useGetKeeperProfileQuery();

    const handleClickSendHomework: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
    };

    if (!userInfo || !userInfo.currentGroup) return null;

    const {
        currentGroup: {
            courseTitle,
            explorers,
        },
    } = userInfo;

    return (
        <>
            <div className={block()}>
                <Typography className={'mb-4'} variant={typographyVariant.h2}>
                    Текущая группа
                </Typography>

                <CardGroupDetails
                    active={active}
                    setActive={setActive}
                    summary={
                        <div className={element('summary')}>
                            <div>
                                <Typography variant={typographyVariant.h1}>
                                    {courseTitle}
                                </Typography>
                                <Typography variant={typographyVariant.regular16}>
                                    Количество человек в группе: {explorers.length}
                                </Typography>

                            </div>

                            <RouterLink
                                to={getUrlThemeByCourseId({ courseId: userInfo?.currentGroup.courseId.toString()! })}>
                                <Button
                                    onClick={handleClickSendHomework}
                                    title='Перейти к курсу'
                                    size={buttonSize.large}
                                    color={buttonColor.filled}
                                />
                            </RouterLink>
                        </div>
                    }
                    content={
                        explorers.map((explorer) => (
                            <div key={explorer.explorerId} className={element('card-wrapper')}>
                                <Card size={cardSize.small}>
                                    <div className={element('card')}>
                                        <Avatar size={avatarSize.small} />

                                        <Typography
                                            className={element('fullname')}
                                            variant={typographyVariant.regular16}
                                        >
                                            {getUserFullName(explorer)}
                                        </Typography>

                                        <div className={element('profile-button')}>
                                            <ExpelButton explorerId={explorer.explorerId} />

                                            <RouterLink
                                                to={getUrlExplorerById(explorer.personId.toString())}>
                                                <Button
                                                    title={'Профиль'} size={buttonSize.small}
                                                    color={buttonColor.filled}
                                                />
                                            </RouterLink>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    }
                />

            </div>
        </>
    );
};