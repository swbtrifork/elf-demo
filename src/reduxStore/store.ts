import { configureStore } from "@reduxjs/toolkit";
import filterTodoSlice from "./todofilters";
import todoSlice from "./todos";

export const reduxStore = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    todoFilter: filterTodoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;
