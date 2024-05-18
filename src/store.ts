import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todo/todoSlice";
import userReducer from "./features/users/userSlice";
import planetsReducer from "./features/planets/planetsSlice";
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    users: userReducer,
    planets: planetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
