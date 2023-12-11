import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import React, { useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import { ModalSendHomework, transformHomeworkResponse } from '@entities/homework';
import { useCreateHomeworkMutation, useGetHomeworksQuery } from '@entities/homework/api/api';
import { useAuth } from '@entities/viewer';
import { useExplorerCourseProgress, useGetKeeperCurrentGroupQuery } from '@entities/course';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import './styles.scss';
import { useGetThemeByThemeIdQuery } from '@entities/theme';

export const AddHomeworkButton = () => {
    const { themeId, courseId } = useParams();
    const [block] = bem('add-button-homework');

    const { role } = useAuth();

    const {
        data: keeperCurrentGroup,
        isError: isErrorCurrentGroup,
    } = useGetKeeperCurrentGroupQuery(undefined, {
        skip: role !== 'KEEPER',
    });
    const {
        data: homeworkResponse,
        isError: isErrorHomeworks,
        isLoading: isLoadingHomeworks,
    } = useGetHomeworksQuery({ themeId: themeId! }, {
        skip: !themeId || role !== 'KEEPER',
    });


    const [createHomework] = useCreateHomeworkMutation();
    const { isSkipThemeQuery, isSuccess } = useExplorerCourseProgress();

    const { isError: isErrorTheme } = useGetThemeByThemeIdQuery(Number(themeId), {
        skip: isSkipThemeQuery,
    });

    const [isOpenModalHomework, setIsOpenModalHomework] = useState(false);

    const handleOnSubmitHomework = (args: { title: string, content: string }) => {
        const { title, content } = args;

        if (!title) return toast.error('Введите название задания!');
        if (!content) return toast.error('Введите контент задания!');

        createHomework({
            themeId: Number(themeId),
            groupId: keeperCurrentGroup?.groupId!,
            title,
            content,
        });
        setIsOpenModalHomework(false);
    };

    if (isErrorCurrentGroup || isErrorTheme)
        return null;
    if (!themeId || isErrorHomeworks || isLoadingHomeworks)
        return null;

    return (
        <>
            <Button
                className={block()}
                title={'Дать еще домашнее задание'}
                size={buttonSize.small}
                color={buttonColor.filled}
                onClick={() => setIsOpenModalHomework(true)}
            />

            <ModalSendHomework
                isOpen={isOpenModalHomework}
                onClose={() => setIsOpenModalHomework(false)}
                onSubmit={handleOnSubmitHomework}
                title='Добавить домашнее задание'
            />
        </>
    );
};