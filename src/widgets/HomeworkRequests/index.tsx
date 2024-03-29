import { HomeworkRequestCard, HomeworkRequestCardGroup, useGetHomeworkRequest } from '@entities/homework';
import { homeworkRequestCardVariant } from '@entities/homework/ui/HomeworkRequestCard/interface';
import React, { Fragment } from 'react';
import { getUserFullName } from '@shared/utils';
import { useAuth } from '@entities/viewer';

export const HomeworkRequests = () => {
    const getHomeworkRequest = useGetHomeworkRequest()!;
    const requestInfo = getHomeworkRequest?.data;
    const { role } = useAuth();

    if (!requestInfo || !requestInfo.request) return null;

    const { request: { homeworkRequestVersions } } = requestInfo;

    return (
        <HomeworkRequestCardGroup>
            {homeworkRequestVersions.map(({ homeworkRequestFeedbacks, explorer, content, versionId }) => (
                <Fragment key={versionId}>
                    {homeworkRequestFeedbacks.map(({ keeper, comment, feedbackId }) => (
                        <HomeworkRequestCard
                            key={feedbackId}
                            username={getUserFullName(keeper)}
                            content={comment}
                            variant={homeworkRequestCardVariant.secondary}
                            isActive={role === 'KEEPER'}
                            personId={keeper.personId}
                        />
                    ))}
                    <HomeworkRequestCard
                        key={versionId}
                        username={getUserFullName(explorer)}
                        content={content}
                        isActive={role === 'EXPLORER'}
                        personId={explorer.personId}
                    />

                </Fragment>
            ))}
        </HomeworkRequestCardGroup>
    );
};