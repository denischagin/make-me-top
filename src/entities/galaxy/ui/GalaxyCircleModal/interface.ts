import {
    Course,
    CourseExplorer,
    CourseKeeper,
} from '@entities/user/model/types';

import {
    LastChosenSystem,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

export interface GalaxyCircleModalProp {
	onClose: () => void;
	you: CourseExplorer;
	lastChosenSystem: LastChosenSystem;
	userProgress: UserProgressInGalaxy;
	yourKeeper: CourseKeeper;
	keepers: CourseKeeper[] | null;
	explorers: CourseExplorer[] | null;
	courseId: number;
	isOpen: boolean
	handleChangeSystem?: (systemId: number) => void;
}
