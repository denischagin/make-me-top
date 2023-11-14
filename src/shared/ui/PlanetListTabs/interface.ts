import { ModalPlanetInterface } from '@entities/user/model/types';

export interface PlanetListTabsProps {
	planets?: ModalPlanetInterface[]
	educationPlanetId?: number
	selectedPlanetId?: number
	status?: PlanetListTabsStatus
	onPlanetClick?: (planetId: number) => void
}

export enum PlanetListTabsStatus {
	opened = "opened",
	closed = "closed",
}
