import { createState, Store } from "@ngneat/elf";
import {
  addEntities,
  deleteEntities,
  selectAll,
  setEntities,
  updateEntities,
  withEntities,
} from "@ngneat/elf-entities";
import Todo from "../interfaces/todos";

const { state, config } = createState(withEntities<Todo>());

const store = new Store({ state, name: "todos", config });

export const todos$ = store.pipe(selectAll());

export const setTodos = (todos: Todo[]) => {
  store.update(setEntities(todos));
};

export const addTodo = (text: Todo["text"]) => {
  store.update(
    addEntities({ completed: false, text, id: Math.random() * 100 })
  );
};

export const updateTodoCompleted = (id: Todo["id"]) => {
  store.update(
    updateEntities(id, (todo) => ({ ...todo, completed: !todo?.completed }))
  );
};

export const deleteTodo = (id: Todo["id"]) => {
  store.update(deleteEntities(id));
};
