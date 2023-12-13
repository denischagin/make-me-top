import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Card } from '@shared/ui/Card';
import React, { MouseEventHandler, useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import {
    GroupDetailsCurrentHomeworkProps,
} from '@entities/homework/ui/GroupDetailsKeeperHomework/interface';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { getUrlHomeworkWithRequestId } from '@shared/constants/links';
import { RequestStatusType } from '@entities/homework/model/types/api';
import { useShowAllText } from '@shared/utils';
import { stringByRequestStatus } from '@entities/homework/constants';

export const GroupDetailsKeeperHomework = ({
                                               content,
                                               onShowMoreClick,
                                               homeworkId,
                                               requests,
                                               title,
                                               isClosed,
                                           }: GroupDetailsCurrentHomeworkProps) => {
    const [activeHomework, setActiveHomework] = useState(false);
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
        <CardGroupDetails
            active={activeHomework}
            setActive={setActiveHomework}
            title='Посмотреть запросы на проверку'
            size={cardSize.large}
            withOutShowMoreElement
            summary={
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

                    <Button
                        title={activeHomework ? 'Скрыть' : `Запросы:${requests.length}шт.`}
                        size={buttonSize.small}
                        color={buttonColor.filled}
                    />
                </div>
            }
            content={
                <div className={element('content')}>
                    {requests.length !== 0 ?
                        requests.map(({ explorer, requestId, status, homeworkId }) => (
                            <Card key={requestId} size={cardSize.small}>
                                <div className={element('card-content')}>
                                    <div>
                                        <Typography variant={typographyVariant.medium16}>
                                            {getUserFullName(explorer)}
                                        </Typography>
                                        <Typography variant={typographyVariant.regular14}>
                                            Статус: {stringByRequestStatus[status.status]}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Button title={'Перейти'} size={buttonSize.small} color={buttonColor.filled}
                                                onClick={handleNavigateToRequest({ homeworkId, requestId })} />
                                    </div>
                                </div>
                            </Card>

                        )) : (
                            <Card size={cardSize.small}>
                                <Typography variant={typographyVariant.regular14}>
                                    Запросы отсутствуют
                                </Typography>
                            </Card>
                        )
                    }
                    {}
                </div>
            }
        />

    );
};