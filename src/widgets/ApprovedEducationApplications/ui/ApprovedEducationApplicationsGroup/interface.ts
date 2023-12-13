import { KeeperCourseGroupAcceptedRequests } from '@entities/keeper/model/types/interfaces';
export interface ApprovedEducationApplicationsGroupProps {
    course: KeeperCourseGroupAcceptedRequests,
    canStartEducation?: boolean
}