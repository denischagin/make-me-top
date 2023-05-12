import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { FETCH_USER } from "@entities/user/model/actions";
import {PostUser, UserStateType} from "@entities/user/model/types";

export const getUser = createAsyncThunk(
    `${FETCH_USER}`,
    async (payload:PostUser) => {
        try {
            // const postman = axios.create({
            //     baseURL: `http://10.254.7.171:8101/user`,
            //     headers: {'username': 'foobar'}
            // })
            const response = await axios.post(`http://10.254.7.187:8084/user`, payload);

            return response.data;
        } catch (err) {
            console.error(err)
        }
    }
);