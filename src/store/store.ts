import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
import requetRe from "../features/todo/requet/requestSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    requests: requetRe
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;