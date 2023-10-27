import { CourseExplorer, CourseKeeper } from "@entities/course";

export interface CurrentUserItemInterface {
    keeper?: CourseKeeper;
    explorer?: CourseExplorer
    badgeTitle: string;
}
