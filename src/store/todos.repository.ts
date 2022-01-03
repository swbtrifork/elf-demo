import { createState, select, Store, withProps } from "@ngneat/elf";
import {
  addEntities,
  deleteEntities,
  selectAll,
  selectAllApply,
  setEntities,
  updateEntities,
  withEntities,
} from "@ngneat/elf-entities";
import { switchMap } from "rxjs";
import Todo from "../interfaces/todos";

const { state, config } = createState(
  withEntities<Todo>(),
  withProps<TodosProps>({ filter: "ALL" })
);

const store = new Store({ state, name: "todos", config });

//CRUD

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

//FILTERS

export interface TodosProps {
  filter: "ALL" | "ACTIVE" | "COMPLETED";
}

export const filter$ = store.pipe(select(({ filter }) => filter));

export const visibleTodos$ = filter$.pipe(
  switchMap((filter) => {
    return store.pipe(
      selectAllApply({
        filterEntity({ completed }) {
          if (filter === "ALL") return true;
          return filter === "COMPLETED" ? completed : !completed;
        },
      })
    );
  })
);

export const updateTodosFilter = (filter: TodosProps["filter"]) => {
  store.update((state) => ({ ...state, filter }));
};
