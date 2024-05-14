import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  page: number;
  planetPage: number;
}

const initialState: PaginationState = {
  page: 1,
  planetPage: 1,
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
      
    },
    setPlanetPage(state, action: PayloadAction<number>) {
      state.planetPage = action.payload;
    },
  },
});

export const {setPage,  setPlanetPage} = requestsSlice.actions;

export default requestsSlice.reducer;