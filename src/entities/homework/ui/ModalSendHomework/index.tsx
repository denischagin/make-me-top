import './styles.scss';
import { Modal } from '@shared/ui/Modal';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { ModalSendHomeworkProps } from '@entities/homework/ui/ModalSendHomework/interface';
import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { useState } from 'react';
import { Textarea } from '@shared/ui/Textarea';
import { textareaColors } from '@shared/ui/Textarea/interface';
import { Input } from '@shared/ui/Input';

export const ModalSendHomework = (props: ModalSendHomeworkProps) => {
    const { title, onSubmit, ...restProps } = props;
    const [block, element] = bem('modal-send-homework');

    const [homeworkValue, setHomeworkValue] = useState('');
    const [homeworkTitle, setHomeworkTitle] = useState('');

    return (
        <Modal {...restProps}>
            <div className={block()}>
                <Typography
                    variant={typographyVariant.h2}
                    color={typographyColor.black}
                >
                    {title}
                </Typography>

                <Typography variant={typographyVariant.h2}></Typography>

                <Input
                    value={homeworkTitle}
                    onChange={(e) => setHomeworkTitle(e.target.value)}
                    placeholder='Введите название задания...'
                />

                <Textarea
                    value={homeworkValue}
                    onChange={(e) => setHomeworkValue(e.target.value)}
                    color={textareaColors.white}
                    placeholder='Введите содержимое...'
                />

                <Button
                    title={'Окей'}
                    size={buttonSize.small}
                    color={buttonColor.filled}
                    onClick={() => onSubmit && onSubmit({ title: homeworkTitle, content: homeworkValue })}
                />

            </div>

        </Modal>

    );
};