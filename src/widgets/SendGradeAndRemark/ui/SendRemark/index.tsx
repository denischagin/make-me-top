import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Textarea } from '@shared/ui/Textarea';
import React, { FormEventHandler, useState } from 'react';
import { SendRemarkProps } from '@widgets/SendGradeAndRemark/ui/SendRemark/interface';
import { useSendHomeworkRequestFeedbackMutation } from '@entities/homework/api/api';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const SendRemark = ({ onSwitchClick }: SendRemarkProps) => {
    const [block, element] = bem('send-remark');
    const { requestId } = useParams();

    const [remarkValue, setRemarkValue] = useState('');

    const [sendRequestFeedback] = useSendHomeworkRequestFeedbackMutation();

    const handleSendRequestFeedbackSuccess = () => setRemarkValue('');

    const handleSendRemark: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (remarkValue === '')
            return toast.error('Заполните поле!');

        sendRequestFeedback({
            requestId: Number(requestId),
            content: remarkValue,
        })
            .unwrap()
            .then(handleSendRequestFeedbackSuccess);
    };

    return (
        <div className={block()}>
            <form onSubmit={handleSendRemark}>
                <Typography variant={typographyVariant.h1} className={element('title')}>
                    Написать замечание
                </Typography>

                <Textarea
                    value={remarkValue}
                    onChange={(e) =>
                        setRemarkValue(e.target.value)}
                    fullwidth
                    name='remark'
                />

                <div className={element('buttons')}>
                    <Button
                        type='submit'
                        title={'Отправить'}
                        size={buttonSize.large}
                        color={buttonColor.filled}
                    />

                    <Button
                        title={'Поставить оценку'}
                        size={buttonSize.large}
                        onClick={onSwitchClick}
                    />
                </div>
            </form>
        </div>
    );
};