import { Keeper } from '@entities/explorer/model/types/interfaces';

import { KeeperForGalaxies } from '@entities/galaxy/model/types';

export interface GalaxyInformationProps {
	galaxyDescription: string | undefined;
	keepers: KeeperForGalaxies[];
	handleHideAll: () => void;
	handleShowMore: () => void;
	isLastLimit: boolean;
}
