import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Textarea } from '@shared/ui/Textarea';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import './styles.scss';
import { useSendHomeworkVersionMutation } from '@entities/homework/api/api';
import { useParams } from 'react-router-dom';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { onErrorHandling } from '@shared/api';

export const SendHomeworkVersionForm = () => {
    const [block, element] = bem('send-homework-version-form');
    const { homeworkId } = useParams();
    const [homeworkVersionValue, setHomeworkVersionValue] = useState('');

    const [sendHomeworkVersion, { isSuccess }] = useSendHomeworkVersionMutation();

    const handleSuccessSendHomeworkVersion = () => setHomeworkVersionValue('');

    const handleChangeHomeworkValue: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
        setHomeworkVersionValue(e.target.value);
    const handleSendHomeworkVersionSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (homeworkVersionValue === '')
            return toast.error('Заполните поле)');

        sendHomeworkVersion({
            homeworkId: Number(homeworkId),
            content: homeworkVersionValue,
        })
            .unwrap()
            .then(handleSuccessSendHomeworkVersion)
            .catch(() => {})
    };

    return (
        <form onSubmit={handleSendHomeworkVersionSubmit} className={block()}>
            <Typography variant={typographyVariant.h1}>
                Новая версия домашнего задания
            </Typography>

            <Textarea
                value={homeworkVersionValue}
                onChange={handleChangeHomeworkValue}
                fullwidth
            />

            <Button
                title={'Отправить'}
                size={buttonSize.large}
                color={buttonColor.filled}
            />
        </form>
    );
};