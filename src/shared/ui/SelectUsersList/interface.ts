import {
    CourseExplorer,
    CourseKeeper,
    CourseUser,
} from '@entities/user/model/types';

export interface SelectUsersListProps {
    selectedUsers: CourseKeeper[];
    keepersList?: CourseKeeper[] | null;
    onSelect: (keepersList: CourseKeeper[]) => void;
    courseId?: number;
}
