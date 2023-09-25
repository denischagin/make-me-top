import {
    FinalAssessmentsInterface,
    ReviewRequestsInterface,
} from '@entities/keeper/model/types/interfaces';

export interface GradeApplicationCardInterface {
    finalAssessment?: FinalAssessmentsInterface;
    reviewRequest?: ReviewRequestsInterface;
}
