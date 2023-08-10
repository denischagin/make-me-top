import {
    FinalAssessmentsInterface,
    ReviewRequestsInterface,
} from '@entities/keeper/model/types/interfaces';

export interface GradeApplicationsInterface {
    finalAssessment?: Array<FinalAssessmentsInterface>;
    reviewRequest?: Array<ReviewRequestsInterface>;
}
