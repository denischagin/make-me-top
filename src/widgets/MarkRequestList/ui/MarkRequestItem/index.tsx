import { CardWithExtraButton } from '@shared/ui/CardWithExtraButton';
import { bem, getUserFullName } from '@shared/utils';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { MarkRequestItemProps } from '@widgets/MarkRequestList/ui/MarkRequestItem/interface';
import { GradeRadioButtonSection } from '@shared/ui/GradeRadioButtonSection';
import { useState } from 'react';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import './styles.scss';
import { SendCourseMarkButton } from '@features/send-course-mark';

export const MarkRequestItem = (props: MarkRequestItemProps) => {
    const {
        courseTitle,
        currentMark,
        currentExplorerId,
        handleChangeMark,
        handleChangeExplorer,
        ...markRequestRest
    } = props;
    const [block, element] = bem('mark-request-item');

    const active = currentExplorerId === markRequestRest.explorerId;

    const handleClickChangeExplorer = () => {
        handleChangeExplorer(active ? null : markRequestRest.explorerId);
    };

    return (
        <div className={block()}>
            <CardWithExtraButton
                fullName={getUserFullName(markRequestRest)}
                active={active}
                content={(
                    <div>
                        <Typography
                            variant={typographyVariant.regular14}
                        >
                            {`Система: ${courseTitle}`}
                        </Typography>
                    </div>
                )}
                buttonContent={active ? 'Отменить' : 'Оценить'}
                onButtonClick={handleClickChangeExplorer}
            />
            {active && (
                <div className={element('mark-wrapper')}>
                    <GradeRadioButtonSection currentGrade={currentMark} onChange={handleChangeMark} />
                    {currentMark && (
                        <SendCourseMarkButton explorerId={markRequestRest.explorerId} valueMark={currentMark} />
                    )}
                </div>
            )}
        </div>
    );
};