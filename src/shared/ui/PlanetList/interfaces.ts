import { ModalPlanetInterface } from '@entities/user/model/types';

export interface PlanetListProps {
    currentPlanet?: string;
    currentPlanetId?: number;
    planetList?: ModalPlanetInterface[];
}
