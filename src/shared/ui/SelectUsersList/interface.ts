import { CourseKeeper } from "@entities/course";

export interface SelectUsersListProps {
    selectedUsers: CourseKeeper[];
    keepersList?: CourseKeeper[] | null;
    onSelect: (keepersList: CourseKeeper[]) => void;
    courseId?: number;
}
