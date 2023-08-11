import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { LoadingState } from '@entities/loading/model/types';

/**
 * При статусе pending передаваемых thunks - устанавливает **isLoading: true**, что позволяет отобразить спиннер загрузки во время выполнения запроса.
 *
 * @example
 * extraReducers: (builder) => {
        setLoadingForThunks(
            builder,
            [
                getModalPlanets,
                getCourseInfo,
                postCourseRequest,
            ],
        );
    },
 *
 * @param {string} builder - дефолтный параметр builder от extraReducers
 * ---
 * @param {string} actions - Массив методов CreateAsyncThunk
 * ---
 *
 * @return
 * - isLoading: true
 * ---
 * @return
 * - isLoading: false
 * ---
 * Каждый метод из передаваемого массива в состоянии **PENDING** будет устанавливать **"isLoading: true"**.
 *
 * Отображение спиннера привязано к boolean значению данного параметра.
 *
 * При любом другом состоянии, таких как **REJECTED/FULFILLED** - **isLoading** будет установлен как **false**
 */

export function setLoadingForThunks(builder: ActionReducerMapBuilder<LoadingState>, actions: Array<any>): void {
    actions.forEach((action) => {
        builder
            .addCase(action.pending, (state: LoadingState) => {
                state.isLoading = true;
            })
            .addCase(action.fulfilled, (state: LoadingState) => {
                state.isLoading = false;
            })
            .addCase(action.rejected, (state: LoadingState) => {
                state.isLoading = false;
            });
    });
}