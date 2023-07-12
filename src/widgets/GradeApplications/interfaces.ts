import {
    FinalAssessmentsEntity,
    ReviewRequestsEntity,
} from '@entities/curator/model/types/interfaces';

export interface GradeApplicationsInterface {
    finalAssesment?: Array<FinalAssessmentsEntity> | null;
    reviewRequest?: Array<ReviewRequestsEntity> | null;
}
