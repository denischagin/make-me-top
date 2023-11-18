import { GradeRadioButtonSection } from '@shared/ui/GradeRadioButtonSection';
import React, { useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import './styles.scss';
import { ConfirmModal } from '@shared/ui/ConfirmModal';

export const SetSendGrade = () => {
    const [block, element] = bem('set-grade');
    const [currentGrade, setCurrentGrade] = useState<number | null>(null);

    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    return (
        <>
            <div className={block()}>
                <Typography variant={typographyVariant.h1}>
                    Выставить оценку
                </Typography>

                <div className={element('wrapper')}>
                    <GradeRadioButtonSection
                        currentGrade={currentGrade}
                        onChange={(grade) => setCurrentGrade(grade)}
                    />

                    <Button
                        title={'Выставить оценку'}
                        size={buttonSize.small}
                        className={element('button-send-grade', {
                            active: !!currentGrade,
                        })}
                        onClick={() => setIsOpenConfirm(true)}
                    />

                </div>
            </div>

            <ConfirmModal
                confirmTitle={'Вы уверены что хотите поставить оценку?'}
                rejectButtonTitle={'Нет, не уверен'}
                submitButtonTitle={'Да, хочу поставить'}
                onSubmit={() => setIsOpenConfirm(false)}
                onClose={() => setIsOpenConfirm(false)}
                isOpen={isOpenConfirm}
            />
        </>

    );
};