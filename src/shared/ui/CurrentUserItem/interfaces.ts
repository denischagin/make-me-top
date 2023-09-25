import {
    CourseExplorer,
    CourseKeeper,
} from '@entities/user/model/types';

export interface CurrentUserItemInterface {
    keeper?: CourseKeeper;
    explorer?: CourseExplorer
    badgeTitle: string;
}
