import { FinalAssessmentsInterface } from '@entities/keeper/model/types/interfaces';

export interface MarkRequestItemProps extends FinalAssessmentsInterface {
    handleChangeMark: (mark: number | null) => void;
    handleChangeExplorer: (explorerId: number | null) => void;
    currentExplorerId: number | null;
    currentMark: number | null;
}