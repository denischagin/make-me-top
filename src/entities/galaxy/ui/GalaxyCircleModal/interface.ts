import {
	LastChosenSystem,
	UserProgressInGalaxy,
} from "@entities/galaxy/model/types";
import {
	Course,
	CourseExplorer,
	CourseKeeper,
} from "@entities/user/model/types";

export interface GalaxyCircleModalProp {
	onClose: () => void;
	you: CourseExplorer;
	lastChosenSystem: LastChosenSystem;
	userProgress: UserProgressInGalaxy;
	yourKeeper: CourseKeeper;
	course: Course;
	keepers: CourseKeeper[] | null;
	explorers: CourseExplorer[] | null;
	courseId: number;
}