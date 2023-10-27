import { CourseInfoResponse, CourseKeeper } from "@entities/course";

export interface KeepersListTabProps {
    courseInfo?: CourseInfoResponse;
    canYouSendCourseRequest?: boolean;
    selectedKeepers: CourseKeeper[];
    setSelectedKeepers: (selectedKeepers: CourseKeeper[]) => void;
}
