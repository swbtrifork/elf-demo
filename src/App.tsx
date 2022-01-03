import { useObservable } from "@ngneat/react-rxjs";
import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Todos from "./Components/Todos";
import { RootState } from "./reduxStore/store";
import { visibleTodos$ } from "./store/todos.repository";

function App() {
  const [todos] = useObservable(visibleTodos$);

  const reduxTodos = useSelector((state: RootState) => state.todos);

  return (
    <div>
      <Todos type={"ELF"} todos={todos}></Todos>
      <Todos type={"REDUX"} todos={reduxTodos}></Todos>
    </div>
  );
}

export default App;
