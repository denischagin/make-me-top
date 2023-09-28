import { Keeper } from '@entities/explorer/model/types/interfaces';

import { KeeperForGalaxies } from '@entities/galaxy/model/types';

import { CurrentGalaxyInterface } from '@pages/AllGalaxiesPage/interface';

export interface GalaxyInformationProps {
	currentGalaxy?: null | CurrentGalaxyInterface
}
