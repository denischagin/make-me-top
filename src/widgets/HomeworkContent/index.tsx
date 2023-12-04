import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { TypographyWithEnter } from '@shared/ui/TypographyWithEnter';
import React, { useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import { useGetHomeworkRequest } from '@entities/homework';
import './styles.scss';
import { Button } from '@shared/ui/Button';
import { buttonSize } from '@shared/ui/Button/interfaces';

export const HomeworkContent = () => {
    const [block, element] = bem('homework-content');

    const getHomeworkRequest = useGetHomeworkRequest();
    const requestsInfo = getHomeworkRequest?.data;

    const [isShowAllText, setIsShowAllText] = useState(false);

    const maxTextLength = 255;

    return (
        <div className={block()}>
            <Typography variant={typographyVariant.h1}>
                Домашнее задание
            </Typography>

            <TypographyWithEnter
                className={element('text')}
                variant={typographyVariant.regular16}
            >
                {isShowAllText ? requestsInfo?.content : requestsInfo?.content.slice(0, maxTextLength)}
            </TypographyWithEnter>

            {(requestsInfo?.content?.length ?? 0) > 255 && (
                isShowAllText ? (
                    <Button title={'Скрыть'} size={buttonSize.small} onClick={() => setIsShowAllText(prev => !prev)} />
                ) : (
                    <Button title={'Показать всё'} size={buttonSize.small}
                            onClick={() => setIsShowAllText(prev => !prev)} />
                )
            )}
        </div>
    );
};