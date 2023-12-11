import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { GroupDetailsOldHomework } from '@widgets/OldHomeworksRequest/ui/GroupDetailsOldHomework';
import { useGetHomeworksQuery } from '@entities/homework/api/api';
import { transformHomeworkResponse } from '@entities/homework';
import { useParams } from 'react-router-dom';

export const OldHomeworksRequest = () => {
    const { themeId } = useParams();

    const { data: homeworkResponse, isError, isLoading } = useGetHomeworksQuery({ themeId: themeId! }, {
        skip: !themeId,
    });
    const closedHomeworks = transformHomeworkResponse(homeworkResponse, 'KEEPER')?.closedHomeworks;

    if (!closedHomeworks || closedHomeworks.length === 0 || isLoading || isError)
        return null;

    return (
        <div>
            <Typography variant={typographyVariant.h2}>
                Предыдущие задания
            </Typography>

            {closedHomeworks.map(({ homeworkId, group: { explorers }, ...restHomework }) => (
                <GroupDetailsOldHomework
                    key={homeworkId}
                    explorers={explorers}
                    {...restHomework}
                />
            ))}

        </div>
    );
};