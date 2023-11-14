import { Dispatch, SetStateAction, createContext } from 'react';

export interface GalaxyContextInterface {
	activeSystemsIds: number[];
	setActiveSystemsIds: Dispatch<SetStateAction<number[]>>;
	deletedSystemsIds: number[];
	setDeletedSystemsIds: Dispatch<SetStateAction<number[]>>;
}

export const GalaxyContext = createContext<GalaxyContextInterface>({
	activeSystemsIds: [],
	setActiveSystemsIds: () => {},
	setDeletedSystemsIds: () => {},
	deletedSystemsIds: []
});
