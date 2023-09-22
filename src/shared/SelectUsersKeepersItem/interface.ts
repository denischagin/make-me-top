import { CourseKeeper } from "@entities/user/model/types";

export interface SelectUsersKeepersItemProps {
	user: CourseKeeper;
	selected: boolean;
	onRemoveUser: (userId: number) => void;
	onSelectUser: (user: CourseKeeper) => void;
}
