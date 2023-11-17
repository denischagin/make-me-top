import { InvestigatedSystemsInterface } from '@entities/explorer/model/types/interfaces';

export interface SystemsListInterface {
	heading: string;
	systems: Array<InvestigatedSystemsInterface>;
	onSystemClick?: (systemId: number) => void;
}