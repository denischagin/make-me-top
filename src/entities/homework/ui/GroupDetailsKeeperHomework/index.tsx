import React, { MouseEventHandler } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import { GroupDetailsCurrentHomeworkProps } from '@entities/homework/ui/GroupDetailsKeeperHomework/interface';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { getUrlHomeworkWithRequestId } from '@shared/constants/links';
import { useShowAllText } from '@shared/utils';
import { CardDetails, CardDetailsButton, CardDetailsContent, CardDetailsSummary } from '@shared/ui/CardDetails';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Stack } from '@shared/ui/Stack';
import { KeeperHomeworkRequestItem } from '@entities/homework/ui/KeeperHomeworkRequestItem';

export const GroupDetailsKeeperHomework = (props: GroupDetailsCurrentHomeworkProps) => {
    const {
        content,
        onShowMoreClick,
        homeworkId,
        requests,
        title,
    } = props;

    const [, element] = bem('group-details-current-homework');
    const navigate = useNavigate();

    const { slicedText: contentSliced } = useShowAllText({
        text: content,
        initTextLength: 100,
    });

    const { slicedText: titleSliced } = useShowAllText({
        text: title,
        initTextLength: 50,
    });

    const handleShowMoreClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        if (!onShowMoreClick) return;
        onShowMoreClick(homeworkId);
    };

    const handleNavigateToRequest = (args: { homeworkId: number, requestId: number }) => () => {
        navigate(getUrlHomeworkWithRequestId(args));
    };


    return (
        <CardDetails
            renderSummary={({ isActive, handleToggle }) => (
                <CardDetailsSummary onClick={handleToggle} isActive={isActive}>
                    <div className={element('summary')}>
                        <div className={element('summary-content')}>
                            <Typography variant={typographyVariant.medium16}>
                                {titleSliced}
                            </Typography>

                            <Typography variant={typographyVariant.regular14} parseLink>
                                {contentSliced}
                            </Typography>
                        </div>

                        <Button
                            title={'Просмотреть'}
                            size={buttonSize.small}
                            onClick={handleShowMoreClick}
                        />

                        <CardDetailsButton
                            isActive={isActive}
                            activeTitle='Скрыть'
                            inactiveTitle={`Запросы:${requests.length}шт.`}
                            size={buttonSize.small}
                            color={buttonColor.filled}
                        />
                    </div>
                </CardDetailsSummary>
            )}
            renderContent={({ isActive }) => (
                <CardDetailsContent isActive={isActive}>
                    <Stack>
                        {requests.length !== 0 ?
                            requests.map((request) => (
                                <KeeperHomeworkRequestItem
                                    key={request.requestId}
                                    handleNavigateToRequest={handleNavigateToRequest({
                                        homeworkId,
                                        requestId: request.requestId,
                                    })}
                                    {...request}
                                />
                            )) : (
                                <Card size={cardSize.small}>
                                    <Typography variant={typographyVariant.regular14}>
                                        Запросы отсутствуют
                                    </Typography>
                                </Card>
                            )}
                    </Stack>
                </CardDetailsContent>
            )}
        />
    );
};