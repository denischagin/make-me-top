import { bem, getUserFullName } from '@shared/utils';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { RouterLink } from '@shared/ui/RouterLink';
import { getUrlHomeworkWithRequestId } from '@shared/constants/links';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { CardWithExtraButtonProps } from '@shared/ui/CardWithExtraButton/interface';
import './styles.scss';

export const CardWithExtraButton = ({
                                        buttonContent,
                                        content,
                                        onButtonClick,
                                        fullName,
                                        buttonHref,
                                        active,
                                    }: CardWithExtraButtonProps) => {
    const [block, element] = bem('card-with-extra-button');

    return (
        <div className={block({
            active,
        })}>
            <Card size={cardSize.large} glow>
                <div className={element('content')}>
                    <div className={element('info')}>
                        <Avatar size={avatarSize.medium} />
                        <div className={element('about')}>
                            <Typography
                                className={element('name')}
                                variant={typographyVariant.medium16}
                            >
                                {fullName}
                            </Typography>
                            {content}
                        </div>
                    </div>
                    <div className={element('button')}>
                        {!!buttonHref ? (
                            <RouterLink
                                to={buttonHref}
                            >
                                <Button
                                    title={buttonContent}
                                    color={buttonColor.filled}
                                    size={buttonSize.large}
                                    onClick={onButtonClick}
                                />
                            </RouterLink>
                        ) : (
                            <Button
                                title={buttonContent}
                                color={buttonColor.filled}
                                size={buttonSize.large}
                                onClick={onButtonClick}
                            />
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
};
