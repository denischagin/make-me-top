import {
    FinalAssessmentsInterface,
    ReviewRequestsInterface,
} from '@entities/keeper/model/types/interfaces';

export interface GradeApplicationsInterface {
    finalAssesment?: Array<FinalAssessmentsInterface>;
    reviewRequest?: Array<ReviewRequestsInterface>;
}
