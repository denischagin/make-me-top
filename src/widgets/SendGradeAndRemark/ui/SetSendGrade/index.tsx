import React, { ChangeEventHandler, useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import './styles.scss';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { SetSendGradeProps } from '@widgets/SendGradeAndRemark/ui/SetSendGrade/interface';
import { Textarea } from '@shared/ui/Textarea';
import { useSendHomeworkMarkMutation } from '@entities/homework/api/api';
import { useParams } from 'react-router-dom';
import { ButtonEstimateHomework } from '@features/estimate-homework';

export const SetSendGrade = ({ onSwitchClick }: SetSendGradeProps) => {
    const [block, element] = bem('set-grade');
    const { requestId } = useParams();
    const [currentGrade, setCurrentGrade] = useState<number | null>(null);
    const [commentGradeValue, setCommentGradeValue] = useState('');

    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    const [acceptHomework] = useSendHomeworkMarkMutation();

    const handleAcceptHomework = () => {
        acceptHomework({
            comment: commentGradeValue,
            requestId: Number(requestId),
        });
    };

    const handleChangeCommentGrade: ChangeEventHandler<HTMLTextAreaElement> = (
        e,
    ) => {
        setCommentGradeValue(e.target.value);
    };

    return (
        <>
            <div className={block()}>
                <Typography variant={typographyVariant.h1}>Принять задание</Typography>

                <Textarea
                    placeholder='Комментарий к оценке (необязательно)'
                    className={element('comment')}
                    fullwidth
                    onChange={handleChangeCommentGrade}
                    value={commentGradeValue}
                />

                <div className={element('buttons')}>
                    <ButtonEstimateHomework
                        color={buttonColor.filled}
                        size={buttonSize.large}
                        title='Принять'
                        handleAcceptHomework={handleAcceptHomework}
                    />
                    <div
                        className={element('button-send-grade', {
                            active: !!currentGrade,
                            inactive: !currentGrade,
                        })}
                    >
                        <Button
                            type='submit'
                            title={'Поставить оценку'}
                            size={buttonSize.large}
                            color={buttonColor.filled}
                            onClick={handleAcceptHomework}
                        />
                    </div>

                    <Button
                        title={'Написать замечание'}
                        size={buttonSize.large}
                        onClick={onSwitchClick}
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
