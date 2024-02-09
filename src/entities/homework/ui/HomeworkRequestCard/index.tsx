import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import {
    HomeworkRequestCardProps,
    homeworkRequestCardVariant,
} from '@entities/homework';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import './styles.scss';
import { useShowAllText } from '@shared/utils';
import { Button } from '@shared/ui/Button';
import { buttonSize } from '@shared/ui/Button/interfaces';

export const HomeworkRequestCard =
    ({
         username, content, variant = homeworkRequestCardVariant.primary, isActive,personId
     }: HomeworkRequestCardProps) => {
        const [block, element] = bem('homework-request-card');
        const { isSmallTextLength, handleToggleShowMoreText, slicedText, isShowAllText } =
            useShowAllText({
                text: content,
            });

        return (
            <div className={block({
                variant,
            })}>
                <Avatar
                    size={avatarSize.mediumSmall}
                    isActive={isActive}
                    personId={personId}
                />

                <Card size={cardSize.medium}>
                    <div className={element('card-content')}>
                        <Typography variant={typographyVariant.h2}>
                            {username}
                        </Typography>

                        <Typography variant={typographyVariant.regular16} parseLink>
                            {slicedText}
                        </Typography>

                        {(!isSmallTextLength && (
                            isShowAllText ? (
                                <Button title={'Скрыть'} size={buttonSize.small}
                                        onClick={handleToggleShowMoreText} />
                            ) : (
                                <Button title={'Показать всё'} size={buttonSize.small}
                                        onClick={handleToggleShowMoreText} />
                            )
                        ))}
                    </div>
                </Card>
            </div>

        );
    };