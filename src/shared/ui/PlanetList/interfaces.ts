import { ModalPlanetInterface } from '@entities/user/model/types';

export interface PlanetListProps {
	educationPlanetId?: number;
	planetList?: ModalPlanetInterface[];
	isSimple?: boolean;
	onPlanetClick?: (planetId: number) => void;
	currentCourseId: number
}
