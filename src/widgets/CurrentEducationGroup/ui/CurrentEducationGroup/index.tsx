import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { CardDetails, CardDetailsContent, CardDetailsIcon, CardDetailsSummary } from '@shared/ui/CardDetails';
import { Button } from '@shared/ui/Button';
import { RouterLink } from '@shared/ui/RouterLink';
import { getUrlExplorerById, getUrlThemeByCourseId } from '@shared/constants/links';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { getUserFullName } from '@shared/utils';
import { ExpelButton } from '@features/expel';
import { Stack } from '@shared/ui/Stack';

export const CurrentEducationGroup = () => {
    const [block, element] = bem('current-education-group');

    const { data: userInfo } = useGetKeeperProfileQuery();

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
                <Typography as='h2' className={'mb-4'} variant={typographyVariant.h2}>
                    Текущая группа
                </Typography>

                <CardDetails
                    renderSummary={({ isActive, handleToggle }) => (
                        <CardDetailsSummary
                            isActive={isActive}
                            onClick={handleToggle}
                            className={element('summary')}
                        >
                            <div className={element('summary-text-wrapper')}>
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
                                    title='Перейти к курсу'
                                    size={buttonSize.large}
                                    color={buttonColor.filled}
                                />
                            </RouterLink>

                            <CardDetailsIcon isActive={isActive} />
                        </CardDetailsSummary>
                    )}
                    renderContent={({ isActive, handleToggle }) => (
                        <CardDetailsContent isActive={isActive}>
                            <Stack>
                                {
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
                            </Stack>
                        </CardDetailsContent>
                    )}
                />
            </div>
        </>
    );
};