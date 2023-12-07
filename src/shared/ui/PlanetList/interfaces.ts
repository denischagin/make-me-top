import { ModalPlanetInterface } from '@entities/user/model/types';

export interface PlanetListProps {
    currentCourseId: number;
    allPlanetsLocked?: boolean;
    educationPlanetId?: number;
    planetList?: ModalPlanetInterface[];
    onPlanetClick?: (planetId: number) => void;
}
