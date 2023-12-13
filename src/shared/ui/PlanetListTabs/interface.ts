import { ModalPlanetInterface } from '@entities/user/model/types';
import { ExplorerProgressPlanetInterface } from '@entities/course';

export interface PlanetListTabsProps {
    planets?: ModalPlanetInterface[];
    themes?: ExplorerProgressPlanetInterface[];
    educationPlanetId?: number;
    selectedPlanetId?: number;
    status?: PlanetListTabsStatus;
    onPlanetClick?: (planetId: number) => void;
    themesWaitingExplorersMark?: number[];
}

export enum PlanetListTabsStatus {
    opened = 'opened',
    closed = 'closed',
}
