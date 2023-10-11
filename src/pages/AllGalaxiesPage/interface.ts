import { GalaxyForGetAll } from '@entities/galaxy/model/types';

export interface CurrentGalaxyInterface extends GalaxyForGetAll {
    index: number;
}
