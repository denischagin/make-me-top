import { Badge } from '@shared/ui/Badge';
import { badgeColor } from '@shared/ui/Badge/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { ExplorerBadgeByRequestStatusProps } from '@entities/homework/ui/ExplorerBadgeByRequestStatus/interface';
import { RequestStatusType } from '@entities/homework/model/types/api';
import { ReactElement } from 'react';

export const ExplorerBadgeByRequestStatus = ({
                                                 requestStatus,
                                                 mark,
                                                 alreadyHaveMarkOnTheme,
                                             }: ExplorerBadgeByRequestStatusProps) => {
    const badgeByRequestStatus: Record<RequestStatusType, ReactElement> = {
        EDITING: (
            <Badge color={badgeColor.black}>
                Хранитель проверил задание
            </Badge>
        ),
        CLOSED: (
            <>
                <Typography variant={typographyVariant.medium14}
                            color={typographyColor.white}>
                    Оценка:
                </Typography>

                <Badge color={badgeColor.primary500}>
                    {mark}
                </Badge>
            </>
        ),
        CHECKING: <></>,
    };

    return (
        <>
            {alreadyHaveMarkOnTheme && requestStatus !== 'CLOSED' ? (
                <Badge color={badgeColor.black}>
                    Вам не требуется выполнять это задание
                </Badge>
            ) : (
                requestStatus ? badgeByRequestStatus[requestStatus] : (
                    <>
                        <Badge color={badgeColor.white}>
                            Невыполненное задание
                        </Badge>
                    </>
                )
            )}
        </>
    );
};