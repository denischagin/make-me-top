import { FETCH_USER } from '@entities/user/model/actions';
import { PostUser } from '@entities/user/model/types';

import { URL_MMT_USER } from '@shared/constants/urls';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getUser = createAsyncThunk(
    FETCH_USER,
    async (payload: PostUser) => {
        try {
            // const postman = axios.create({
            //     baseURL: `http://10.254.7.171:8101/user`,
            //     headers: {'username': 'foobar'}
            // })
            const response = await axios.post(
                URL_MMT_USER,
                payload,
            );

            return response.data;
        } catch (err) {
            console.error(err);
        }
    },
);