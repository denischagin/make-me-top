import { StudyRequestsInterface } from '@entities/curator/model/types/interfaces';

export interface EducationApplicationsInterface {
    applications: Array<StudyRequestsInterface> | null | undefined;
}
