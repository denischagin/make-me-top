import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem, getUserFullName } from '@shared/utils';
import { stringByRequestStatus } from '@entities/homework/constants';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import React from 'react';
import { KeeperHomeworkRequestItemProps } from '@entities/homework/ui/KeeperHomeworkRequestItem/interface';

export const KeeperHomeworkRequestItem = (props: KeeperHomeworkRequestItemProps) => {
    const {
        requestId,
        homeworkId,
        status,
        explorer,
        handleNavigateToRequest,
    } = props;
    const [, element] = bem('group-details-current-homework');

    return (
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
                    <Button
                        title={'Перейти'}
                        size={buttonSize.small}
                        color={buttonColor.filled}
                        onClick={handleNavigateToRequest}
                    />
                </div>
            </div>
        </Card>

    );
};