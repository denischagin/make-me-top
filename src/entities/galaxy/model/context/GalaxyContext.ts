import { Dispatch, SetStateAction, createContext } from 'react';

export interface GalaxyContextInterface {
    activeSystemsIds: number[];
    setActiveSystemsIds: Dispatch<SetStateAction<number[]>>;
}

export const GalaxyContext = createContext<GalaxyContextInterface>({
    activeSystemsIds: [],
    setActiveSystemsIds: () => {},
});
