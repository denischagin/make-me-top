import { Modal } from '@shared/ui/Modal';
import { ModalCreateFeedbackCourseProps } from './interface';
import { useCreateCourseRatingMutation } from '@entities/feedback';
import { GradeRadioButtonSection } from '@shared/ui/GradeRadioButtonSection';
import { useState } from 'react';
import { Stack } from '@shared/ui/Stack';
import { stackAlign, stackDirection, stackSpacing } from '@shared/ui/Stack/interface';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { bem } from '@shared/utils';

export const ModalCreateCourseRating = (props: ModalCreateFeedbackCourseProps) => {
    const [block, element] = bem('modal-create-course-rating');

    const { onClose, explorerId } = props;

    const [createCourseRating] = useCreateCourseRatingMutation();
    const [currentGrade, setCurrentGrade] = useState<null | number>();

    const handleChangeCurrentGrade = (grade: number | null) => {
        setCurrentGrade(grade);
    };

    const handleCreateCourseRating = () => {
        if (!currentGrade) return;

        createCourseRating({
            rating: currentGrade,
            explorerId,
        })
            .unwrap()
            .then(onClose)
            .catch(() => {})
    };

    return (
        <Modal {...props}>
            <div className={block()}>
                <Stack spacing={stackSpacing.medium}>
                    <Typography variant={typographyVariant.h2} color={typographyColor.black}>
                        Дайте оценку курсу
                    </Typography>

                    <Stack
                        direction={stackDirection.horizontal}
                        align={stackAlign.center}
                        spacing={stackSpacing.large}
                    >
                        <GradeRadioButtonSection
                            onChange={handleChangeCurrentGrade}
                            currentGrade={currentGrade}
                        />

                        {currentGrade && (
                            <Button
                                title={'Оценить'}
                                size={buttonSize.small}
                                color={buttonColor.filled}
                                onClick={handleCreateCourseRating}
                            />
                        )}
                    </Stack>

                </Stack>
            </div>
        </Modal>
    );
};