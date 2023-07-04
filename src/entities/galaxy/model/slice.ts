import { createSlice } from '@reduxjs/toolkit';

import { getGalaxy } from '../thunks/getGalaxy';

import { GalaxyType } from './types';

const galaxySlice = createSlice({
    name: 'galaxy',
    initialState: {
        galaxyId: 0,
        galaxyName: '',
        orbitList: [],
    } as GalaxyType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGalaxy.fulfilled, (state, action) => {

            state.orbitList = action.payload.orbitList;
            state.galaxyId = action.payload.galaxyId;
            state.galaxyName = action.payload.galaxyName;
        });

        builder.addCase(getGalaxy.rejected, (state, action) => {

            const testOrbitList = [
                {
                    'orbitId': 1,
                    'countSystem': 20,
                    'levelOrbit': 1,
                    'galaxyId': 1,
                    'systemList': [
                        {
                            'systemId': 1,
                            'systemName': 'groovy',
                            'systemLevel': 1,
                            'positionSystem': 125,
                            'systemDependencyList': [
                                {
                                    'systemId': 20,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 2,
                            'systemName': 'JS',
                            'systemLevel': 1,
                            'positionSystem': 30,
                            'systemDependencyList': [
                                {
                                    'systemId': 15,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 3,
                            'systemName': 'Perfomance',
                            'systemLevel': 1,
                            'positionSystem': 60,
                            'systemDependencyList': [
                                {
                                    'systemId': 15,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 16,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 4,
                            'systemName': 'Scala',
                            'systemLevel': 1,
                            'positionSystem': 90,
                            'systemDependencyList': [
                                {
                                    'systemId': 16,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 5,
                            'systemName': 'Docker',
                            'systemLevel': 1,
                            'positionSystem': 135,
                            'systemDependencyList': [
                                {
                                    'systemId': 11,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 12,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 21,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 6,
                            'systemName': 'API',
                            'systemLevel': 1,
                            'positionSystem': 190,
                            'systemDependencyList': [
                                {
                                    'systemId': 13,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 17,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 7,
                            'systemName': 'Java',
                            'systemLevel': 1,
                            'positionSystem': 225,
                            'systemDependencyList': [
                                {
                                    'systemId': 14,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 8,
                            'systemName': 'Locators',
                            'systemLevel': 1,
                            'positionSystem': 300,
                            'systemDependencyList': [
                                {
                                    'systemId': 18,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 9,
                            'systemName': 'Git',
                            'systemLevel': 1,
                            'positionSystem': 270,
                            'systemDependencyList': [
                                {
                                    'systemId': 18,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 10,
                            'systemName': 'SQL',
                            'systemLevel': 1,
                            'positionSystem': 330,
                            'systemDependencyList': [
                                {
                                    'systemId': 22,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                            ],
                        },
                    ],
                },
                {
                    'orbitId': 2,
                    'countSystem': 20,
                    'levelOrbit': 2,
                    'galaxyId': 1,
                    'systemList': [
                        {
                            'systemId': 11,
                            'systemName': 'Jenkins',
                            'systemLevel': 2,
                            'positionSystem': 135,
                            'systemDependencyList': [
                                {
                                    'systemId': 19,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 20,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 5,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 12,
                            'systemName': 'Mock',
                            'systemLevel': 2,
                            'positionSystem': 150,
                            'systemDependencyList': [
                                {
                                    'systemId': 21,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 5,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 13,
                            'systemName': 'MQ',
                            'systemLevel': 2,
                            'positionSystem': 180,
                            'systemDependencyList': [
                                {
                                    'systemId': 21,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 6,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 14,
                            'systemName': 'Maven',
                            'systemLevel': 2,
                            'positionSystem': 240,
                            'systemDependencyList': [
                                {
                                    'systemId': 17,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 18,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 7,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                    ],
                },
                {
                    'orbitId': 3,
                    'countSystem': 20,
                    'levelOrbit': 3,
                    'galaxyId': 1,
                    'systemList': [
                        {
                            'systemId': 15,
                            'systemName': 'K6',
                            'systemLevel': 3,
                            'positionSystem': 30,
                            'systemDependencyList': [
                                {
                                    'systemId': 19,
                                    'type': 'child',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 2,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 3,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 16,
                            'systemName': 'Gatling',
                            'systemLevel': 3,
                            'positionSystem': 60,
                            'systemDependencyList': [
                                {
                                    'systemId': 19,
                                    'type': 'child',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 3,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 4,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 17,
                            'systemName': 'API Automation',
                            'systemLevel': 3,
                            'positionSystem': 210,
                            'systemDependencyList': [
                                {
                                    'systemId': 22,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 23,
                                    'type': 'child',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 24,
                                    'type': 'child',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 6,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 14,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 18,
                            'systemName': 'UI Automation',
                            'systemLevel': 3,
                            'positionSystem': 270,
                            'systemDependencyList': [
                                {
                                    'systemId': 23,
                                    'type': 'child',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 24,
                                    'type': 'child',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 14,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 8,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 9,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                    ],
                },
                {
                    'orbitId': 4,
                    'countSystem': 20,
                    'levelOrbit': 4,
                    'galaxyId': 1,
                    'systemList': [
                        {
                            'systemId': 19,
                            'systemName': 'Reporting Load Testing',
                            'systemLevel': 4,
                            'positionSystem': 15,
                            'systemDependencyList': [
                                {
                                    'systemId': 15,
                                    'type': 'parent',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 16,
                                    'type': 'parent',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 11,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 20,
                            'systemName': 'Pipeline',
                            'systemLevel': 4,
                            'positionSystem': 45,
                            'systemDependencyList': [
                                {
                                    'systemId': 1,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 11,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 21,
                            'systemName': 'Async MKS',
                            'systemLevel': 4,
                            'positionSystem': 150,
                            'systemDependencyList': [
                                {
                                    'systemId': 5,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 12,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 13,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 22,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 22,
                            'systemName': 'JDBI',
                            'systemLevel': 4,
                            'positionSystem': 340,
                            'systemDependencyList': [
                                {
                                    'systemId': 21,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 17,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 23,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 10,
                                    'type': 'parent',
                                    'isAlternative': false,
                                },
                            ],
                        },
                        {
                            'systemId': 23,
                            'systemName': 'Autotest project',
                            'systemLevel': 4,
                            'positionSystem': 285,
                            'systemDependencyList': [
                                {
                                    'systemId': 22,
                                    'type': 'child',
                                    'isAlternative': false,
                                },
                                {
                                    'systemId': 17,
                                    'type': 'parent',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 18,
                                    'type': 'parent',
                                    'isAlternative': true,
                                },
                            ],
                        },
                        {
                            'systemId': 24,
                            'systemName': 'Reporting UI/API Test',
                            'systemLevel': 4,
                            'positionSystem': 210,
                            'systemDependencyList': [
                                {
                                    'systemId': 17,
                                    'type': 'parent',
                                    'isAlternative': true,
                                },
                                {
                                    'systemId': 18,
                                    'type': 'parent',
                                    'isAlternative': true,
                                },
                            ],
                        },
                    ],
                },
            ];

            //@ts-ignore
            state.orbitList = testOrbitList;
            state.galaxyId = 1;
            state.galaxyName = 'Автоматизация';
        });
    },
});

export default galaxySlice.reducer;
