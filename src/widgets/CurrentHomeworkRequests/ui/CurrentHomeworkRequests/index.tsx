import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import React, { useState } from 'react';
import { KeeperHomeworkItem, transformHomeworkResponse } from '@entities/homework';
import { useParams } from 'react-router-dom';
import './styles.scss';
import { GroupDetailsKeeperHomework } from '@entities/homework';
import { useAuth } from '@entities/viewer';
import { AddHomeworkButton } from '@features/add-homework';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { EditHomeworkModal } from '@features/edit-homework';

export const CurrentHomeworkRequests = () => {
    const [block, element] = bem('current-homework-requests');
    const { themeId, courseId } = useParams();
    const { role } = useAuth();
    const {
        data: homeworkResponse,
        isError: isErrorHomeworks,
        isLoading: isLoadingHomeworks,
    } = useGetHomeworksQuery({ themeId: themeId! }, {
        skip: !themeId || role !== 'KEEPER',
    });

    const activeHomeworks = transformHomeworkResponse(homeworkResponse, 'KEEPER')?.activeHomeworks;

    if (!themeId || isErrorHomeworks || isLoadingHomeworks)
        return null;


    return (
        <>
            <div className={block()}>
                <Typography variant={typographyVariant.h2}>
                    Текущие домашние задания
                </Typography>

                <div className={element('cards')}>
                    {activeHomeworks && activeHomeworks.length !== 0 ? (
                        activeHomeworks?.map((homework) => (
                            <KeeperHomeworkItem key={homework.homeworkId} homework={homework} />
                        ))
                    ) : (
                        <Typography variant={typographyVariant.regular16}>
                            Нет активных домашних заданий
                        </Typography>
                    )}
                </div>
            </div>

        </>

    );
};