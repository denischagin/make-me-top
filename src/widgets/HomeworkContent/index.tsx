import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { TypographyWithEnter } from '@shared/ui/TypographyWithEnter';
import React, { useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import { useGetHomeworkRequest } from '@entities/homework';
import './styles.scss';
import { Button } from '@shared/ui/Button';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { useShowAllText } from '@shared/utils';

export const HomeworkContent = () => {
    const [block, element] = bem('homework-content');

    const getHomeworkRequest = useGetHomeworkRequest();
    const requestsInfo = getHomeworkRequest?.data;

    const { handleToggleShowMoreText, isSmallTextLength, slicedText, isShowAllText } = useShowAllText({
        text: requestsInfo?.content ?? '',
    });

    return (
        <div className={block()}>
            <Typography variant={typographyVariant.h1}>
                Домашнее задание
            </Typography>

            <TypographyWithEnter
                className={element('text')}
                variant={typographyVariant.regular16}
            >
                {slicedText}
            </TypographyWithEnter>

            {(!isSmallTextLength && (
                isShowAllText ? (
                    <Button title={'Скрыть'} size={buttonSize.small} onClick={handleToggleShowMoreText} />
                ) : (
                    <Button title={'Показать всё'} size={buttonSize.small}
                            onClick={handleToggleShowMoreText} />
                )
            ))}
        </div>
    );
};