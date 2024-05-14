import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => ({
        payload: {
          id: new Date().toISOString(),
          text,
          completed: false,
        },
      }),
    },

    delTodo: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    checkTodo: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state[index].completed = !state[index].completed;
      }
    }
  },
});

export const { addTodo, delTodo, checkTodo } = todoSlice.actions;

export default todoSlice.reducer;