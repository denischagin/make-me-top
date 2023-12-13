import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { KeeperHomeworkItem, transformHomeworkResponse } from '@entities/homework';
import { useParams } from 'react-router-dom';
import { bem } from '@shared/utils';
import './styles.scss';

export const OldHomeworksRequest = () => {
    const { themeId } = useParams();
    const [block, element] = bem('old-homework-request');

    const { data: homeworkResponse, isError, isLoading } = useGetHomeworksQuery({ themeId: themeId! }, {
        skip: !themeId,
    });
    const closedHomeworks = transformHomeworkResponse(homeworkResponse, 'KEEPER')?.closedHomeworks;

    if (!closedHomeworks || closedHomeworks.length === 0 || isLoading || isError)
        return null;

    return (
        <div className={block()}>
            <Typography variant={typographyVariant.h2}>
                Предыдущие задания
            </Typography>

            <div className={element('cards')}>
                {closedHomeworks.map((homework) => (
                    <KeeperHomeworkItem homework={homework} isClosed />
                ))}
            </div>

        </div>
    );
};