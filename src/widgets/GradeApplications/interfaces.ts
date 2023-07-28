import {
    FinalAssessmentsInterface,
    ReviewRequestsInterface,
} from '@entities/curator/model/types/interfaces';

export interface GradeApplicationsInterface {
    finalAssesment?: Array<FinalAssessmentsInterface>;
    reviewRequest?: Array<ReviewRequestsInterface>;
}
