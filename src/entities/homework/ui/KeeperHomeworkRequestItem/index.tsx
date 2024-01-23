import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem, getUserFullName } from '@shared/utils';
import { stringByRequestStatus } from '@entities/homework/constants';
import React, { ReactElement } from 'react';
import { KeeperHomeworkRequestItemProps } from '@entities/homework/ui/KeeperHomeworkRequestItem/interface';
import { RequestStatusType } from '@entities/homework/model/types/api';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

export const KeeperHomeworkRequestItem = (props: KeeperHomeworkRequestItemProps) => {
    const {
        requestId,
        status: { status },
        explorer,
        handleNavigateToRequest,
    } = props;
    const [, element] = bem('group-details-current-homework');

    const renderTextByRequestStatus: Record<RequestStatusType, ReactElement | string> = {
        CHECKING: (
            <Typography variant={typographyVariant.regular14} color={typographyColor.primary500}>
                {stringByRequestStatus[status]}
            </Typography>
        ),
        CLOSED: (
            <Typography variant={typographyVariant.regular14}>
                {stringByRequestStatus[status]}
            </Typography>
        ),
        EDITING: (
            <Typography variant={typographyVariant.regular14}>
                {stringByRequestStatus[status]}
            </Typography>
        ),
    };

    return (
        <>
            <Card key={requestId} size={cardSize.small} className={element('item')}>
                <div className={element('card-content')}>
                    <div className={element('title-wrapper')}>
                        <Typography variant={typographyVariant.medium16}>
                            {getUserFullName(explorer)}
                        </Typography>

                        {renderTextByRequestStatus[status]}
                    </div>

                    <div className={element('button-extra')}>
                        <Button
                            title={'Перейти'}
                            size={buttonSize.small}
                            color={buttonColor.filled}
                            onClick={handleNavigateToRequest}
                        />
                    </div>
                </div>
            </Card>
        </>

    );
};