import { FETCH_GALAXY } from '@entities/galaxy/model/actions';

import { createAsyncThunk } from '@reduxjs/toolkit';

interface IFetchGalaxy {
    galaxy?: number;
}

export const getGalaxy = createAsyncThunk(`${FETCH_GALAXY}`, async (payload: IFetchGalaxy, thunkAPI) => {
    const response = await fetch(`${process.env.REACT_APP_FETCH_URL}/galaxy-app/galaxy/1`);

    return await response.json();
});
