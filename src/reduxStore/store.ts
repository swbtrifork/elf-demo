import { configureStore } from "@reduxjs/toolkit";
import filterTodoSlice from "./todofilters";
import todoSlice from "./todos";

export const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
    todoFilter: filterTodoSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
