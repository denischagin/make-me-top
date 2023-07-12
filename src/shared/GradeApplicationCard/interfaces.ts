import {
    FinalAssessmentsInterface,
    ReviewRequestsInterface,
} from '@entities/curator/model/types/interfaces';

export interface GradeApplicationCardInterface {
    finalAssesment?: FinalAssessmentsInterface;
    reviewRequest?: ReviewRequestsInterface;
}
