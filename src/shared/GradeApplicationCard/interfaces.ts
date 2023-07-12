import {
    FinalAssessmentsEntity,
    ReviewRequestsEntity,
} from '@entities/curator/model/types/interfaces';

export interface GradeApplicationCardInterface {
    finalAssesment?: FinalAssessmentsEntity;
    reviewRequest?: ReviewRequestsEntity;
}
