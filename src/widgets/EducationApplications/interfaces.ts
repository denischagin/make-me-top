import { StudyRequestsEntity } from '@entities/curator/model/types/interfaces';

export interface EducationApplicationsInterface {
    applications: Array<StudyRequestsEntity> | null | undefined;
}
