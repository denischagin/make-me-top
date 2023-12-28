import { Modal } from '@shared/ui/Modal';
import { Stack } from '@shared/ui/Stack';
import { stackAlign, stackSpacing } from '@shared/ui/Stack/interface';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { GradeRadioButtonSection } from '@shared/ui/GradeRadioButtonSection';
import { Textarea } from '@shared/ui/Textarea';
import { textareaColors } from '@shared/ui/Textarea/interface';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { ModalCreateFeedbackProps } from '@features/create-feedback';
import { ChangeEventHandler, useState } from 'react';
import toast from 'react-hot-toast';
import { bem } from '@shared/utils';
import './styles.scss';

export const ModalCreateFeedback = (props: ModalCreateFeedbackProps) => {
    const { title, onSubmit, ...restProps } = props;
    const [block, element] = bem('modal-create-feedback');

    const [commentValue, setCommentValue] = useState('');
    const [currentGrade, setCurrentGrade] = useState<null | number>();

    const handleChangeCurrentGrade = (grade: number | null) => {
        setCurrentGrade(grade);
    };

    const handleCommentChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setCommentValue(e.target.value);
    };

    const handleSubmitFeedback = () => {
        if (!currentGrade) return;

        const commentValueTrim = commentValue.trim();

        if (!commentValueTrim)
            return toast.error('Напишите комментарий к оценке');

        onSubmit({
            rating: currentGrade,
            comment: commentValueTrim,
        });
    };

    return (
        <Modal {...restProps}>
            <div className={block()}>
                <Stack spacing={stackSpacing.medium} align={stackAlign.left}>
                    <Typography variant={typographyVariant.h2} color={typographyColor.black}>
                        {title}
                    </Typography>

                    <GradeRadioButtonSection
                        onChange={handleChangeCurrentGrade}
                        currentGrade={currentGrade}
                    />

                    <Textarea
                        value={commentValue}
                        onChange={handleCommentChange}
                        color={textareaColors.white}
                        fullwidth
                    />

                    {currentGrade && !!commentValue.trim() && (
                        <Button
                            title={'Оценить'}
                            size={buttonSize.large}
                            color={buttonColor.filled}
                            onClick={handleSubmitFeedback}
                            className={element('extra-button')}
                        />
                    )}

                </Stack>
            </div>
        </Modal>
    );
};