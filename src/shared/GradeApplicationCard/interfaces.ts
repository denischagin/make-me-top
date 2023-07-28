import {
    FinalAssessmentsInterface,
    ReviewRequestsInterface,
} from '@entities/keeper/model/types/interfaces';

export interface GradeApplicationCardInterface {
    finalAssesment?: FinalAssessmentsInterface;
    reviewRequest?: ReviewRequestsInterface;
}
