import { ReactNode } from 'react';

export interface GradeRadioButtonSectionProps {
    grades?: number[];
    onChange?: (grade: number | null) => void;
    currentGrade?: number | null
}