import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
    users: unknown[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    search: string;
}

const initialState: UserState = {
    users: [],
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
    search: ''
};

const fetchUsers = createAsyncThunk("users/fetchUsers", async ({ page, search }: { page: number, search: string }) => {
    const { data } = await axios.get(`https://swapi.dev/api/people/?page=${page}&search=${search}`);
    return data;
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 10);
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    }
});

export const { setPage, setSearch } = userSlice.actions;

export default userSlice.reducer;

export { fetchUsers };
