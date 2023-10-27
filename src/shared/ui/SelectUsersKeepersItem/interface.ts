import { CourseKeeper } from '@entities/course';

export interface SelectUsersKeepersItemProps {
    user: CourseKeeper;
    selected: boolean;
    onRemoveUser: (userId: number) => void;
    onSelectUser: (user: CourseKeeper) => void;
}
