import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { useState } from 'react';
import { GradeRadioButtonSectionProps } from '@shared/ui/GradeRadioButtonSection/interface';
import { GradeRadioButton } from '@shared/ui/GradeRadioButton';

export const GradeRadioButtonSection = ({ grades = [1, 2, 3, 4, 5], onChange, currentGrade }: GradeRadioButtonSectionProps) => {
    const [block, element] = bem('grade-radio-button-section');

    const handeOnClick = (grade: number) => () => {
        const currentGradeTemp = grade === currentGrade
            ? null
            : grade;

        onChange && onChange(currentGradeTemp);
    };

    return (
        <div className={block()}>
            {grades.map((grade) => (
                <GradeRadioButton
                    key={grade}
                    active={currentGrade === grade}
                    onClick={handeOnClick(grade)}>
                    {grade}
                </GradeRadioButton>
            ))}
        </div>
    );
};