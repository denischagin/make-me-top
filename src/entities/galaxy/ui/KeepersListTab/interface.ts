import { CourseInfoInterface, CourseKeeper } from '@entities/user/model/types';

export interface KeepersListTabProps {
    courseInfo?: CourseInfoInterface;
    canYouSendCourseRequest?: boolean;
    selectedKeepers: CourseKeeper[];
    setSelectedKeepers: (selectedKeepers: CourseKeeper[]) => void;
}
