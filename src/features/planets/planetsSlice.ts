import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface planetstate {
    planets: unknown[];
    page: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
    search: string;
}

const initialState: planetstate = {
    planets: [],
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
    search: ''
};

const fetchplanets = createAsyncThunk("planets/fetchplanets", async ({ page, search }: { page: number, search: string }) => {
    const { data } = await axios.get(`https://swapi.dev/api/planets/?page=${page}&search=${search}`);
    return data;
});

const planetslice = createSlice({
    name: "planets",
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
            .addCase(fetchplanets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchplanets.fulfilled, (state, action) => {
                state.loading = false;
                state.planets = action.payload.results;
                state.totalPages = Math.ceil(action.payload.count / 10);
            })
            .addCase(fetchplanets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    }
});

export const { setPage, setSearch } = planetslice.actions;

export default planetslice.reducer;

export { fetchplanets };
