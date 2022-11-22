import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string
}


export const fetchGetPosts = createAsyncThunk(
    'fetchPosts',
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get<IPost[]>("https://jsonplaceholder.typicode.com/posts");
            return { posts: data };
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: 'serverError' });
        }
    }
)