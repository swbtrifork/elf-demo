import { useObservable } from "@ngneat/react-rxjs";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "./App.css";
import Todos from "./Components/Todos";
import { RootState } from "./reduxStore/store";
import { visibleTodos$ } from "./store/todos.repository";

function App() {
  const [todos] = useObservable(visibleTodos$);

  const reduxTodos = useSelector((state: RootState) => state.todos);

  return (
    <Wrapper>
      <Todos type={"ELF"} todos={todos}></Todos>
      <Todos type={"REDUX"} todos={reduxTodos}></Todos>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 48px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export default App;
