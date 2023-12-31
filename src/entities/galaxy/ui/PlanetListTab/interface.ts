import { ModalPlanetInterface } from '@entities/user/model/types';

export interface PlanetListTabProps {
    planets?: ModalPlanetInterface[];
    currentPlanetId?: number;
    currentCourseId?: number;
    allPlanetsLocked?: boolean;
    currentGrade?: number;
}
