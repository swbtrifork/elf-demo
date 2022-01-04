import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodosFilterProps } from "../interfaces/todos";

const initialState: TodosFilterProps = { filter: "ALL" };

const filterTodoSlice = createSlice({
  name: "filterTodos",
  initialState,
  reducers: {
    setTodoFilter: (state, action: PayloadAction<TodosFilterProps>) => {
      return (state = action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTodoFilter } = filterTodoSlice.actions;

export default filterTodoSlice;
