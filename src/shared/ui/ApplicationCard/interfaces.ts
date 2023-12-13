import {
    FinalAssessmentsInterface,
    ReviewRequestsInterface,
} from '@entities/keeper/model/types/interfaces';

export interface ApplicationCardInterface {
    finalAssessment?: FinalAssessmentsInterface;
    reviewRequest?: ReviewRequestsInterface;
}
