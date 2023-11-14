import { GalaxyContext } from '@entities/galaxy/model/context/GalaxyContext';
import React, { ReactNode, useState } from 'react';

export interface GalaxyProviderProps {
	children: ReactNode;
}

export const GalaxyProvider = ({ children }: GalaxyProviderProps) => {
	const [activeSystemsIds, setActiveSystemsIds] = useState<number[]>([]);
	const [deletedSystemsIds, setDeletedSystemsIds] = useState<number[]>([]);
	
	return (
		<GalaxyContext.Provider
			value={{
				activeSystemsIds,
				setActiveSystemsIds,
				deletedSystemsIds,
				setDeletedSystemsIds,
			}}
		>
			{children}
		</GalaxyContext.Provider>
	);
};
