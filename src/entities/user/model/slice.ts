import { createSlice } from "@reduxjs/toolkit";

import { authLogin } from "../thunks/authLogin";
import { getCourseInfo } from "../thunks/getCourseInfo";
import { getModalPlanets } from "../thunks/getModalPlanets";

import { UserState } from "./types/index";
import { initialCourseInfo } from "./constants";
import { postCourseRequest } from "../thunks/postCourseRequest";

const initialState: UserState = {
	isError: false,
	isSuccess: false,
	isLoading: false,
	isRegistered: true,
	isModalOpen: false,
	planetList: [],
	courseInfo: initialCourseInfo,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		selectIsUserRegistered: (state) => {
			state.isRegistered = !state.isRegistered;
		},
		logOut: (state) => {
			state.isRegistered = true;
		},
		showModal: (state) => {
			state.isModalOpen = true;
		},
		toggleModal: (state) => {
			state.isModalOpen = !state.isModalOpen;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getModalPlanets.fulfilled, (state: UserState, action) => {
				state.planetList = action.payload;
			})
			.addCase(getModalPlanets.rejected, (state: UserState) => {
				state.planetList = [];
			})

			.addCase(getCourseInfo.fulfilled, (state: UserState, action) => {
				state.courseInfo = action.payload;
			})
			.addCase(getCourseInfo.rejected, (state: UserState) => {
				state.courseInfo = initialCourseInfo;
			})

			.addCase(postCourseRequest.fulfilled, (state: UserState) => {
				state.isError = false;
				state.isSuccess = true;
			})
			.addCase(postCourseRequest.pending, (state: UserState) => {
				state.isError = false;
				state.isSuccess = false;
			})
			.addCase(postCourseRequest.rejected, (state: UserState) => {
				state.isError = true;
				state.isSuccess = false;
			});
	},
});

export const {
	selectIsUserRegistered,
	logOut,
	toggleModal,
	closeModal,
	showModal,
} = userSlice.actions;

export default userSlice.reducer;
