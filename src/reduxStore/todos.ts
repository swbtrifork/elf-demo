import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Todo, { intialState } from "../interfaces/todos";

const initialState: Todo[] = intialState;

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setReduxTodo: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    addReduxTodo: (state, action: PayloadAction<Todo["text"]>) => {
      return [
        { completed: false, text: action.payload, id: Math.random() * 100 },
        ...state,
      ];
    },
    deleteReduxTodo: (state, action: PayloadAction<Todo["id"]>) => {
      return state.filter(({ id }) => {
        return !(id === action.payload);
      });
    },
    updateReduxTodo: (state, action: PayloadAction<Todo["id"]>) => {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addReduxTodo, deleteReduxTodo, setReduxTodo, updateReduxTodo } =
  todoSlice.actions;

export default todoSlice;
