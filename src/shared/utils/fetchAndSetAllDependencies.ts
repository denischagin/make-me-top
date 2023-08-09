import React from 'react';

import { SystemDependencyType } from '@entities/galaxy/model/types';

import {
    fetchSystemById,
    SystemResponseInterface,
} from '@entities/orbit/thunks/fetchSystemById';

interface FetchAndSetAllDependencies {
    list: Array<SystemDependencyType> | undefined;
    setStateList: React.Dispatch<React.SetStateAction<Array<SystemResponseInterface>>>
}

export const fetchAndSetAllDependencies = async (params: FetchAndSetAllDependencies) => {
    const {
        list = [],
        setStateList,
    } = params;

    const allData = await Promise.all(
        list.map((
            {
                systemId,
            }) => fetchSystemById({
            id: systemId,
        })),
    );

    setStateList(allData);
};