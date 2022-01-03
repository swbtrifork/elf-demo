import { useObservable } from "@ngneat/react-rxjs";
import { useEffect } from "react";
import styled from "styled-components";
import {
  addTodo,
  deleteTodo,
  updateTodoCompleted,
  visibleTodos$,
} from "../../store/todos.repository";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import TodosFilter from "./TodosFilter";

const Todos = () => {
  const [todos] = useObservable(visibleTodos$);

  useEffect(() => {
    addTodo("Welcome");
    addTodo("To");
    addTodo("Elf");
  }, []);

  return (
    <Wrapper>
      <Heading>TODOS</Heading>
      <Card>
        <Header>
          <TodosFilter></TodosFilter>
          <AddTodo onAdd={addTodo}></AddTodo>
        </Header>

        <section>
          {todos.map((todo) => {
            return (
              <TodoItem
                todo={todo}
                key={todo.id}
                onClick={updateTodoCompleted}
                onDelete={deleteTodo}
              ></TodoItem>
            );
          })}
        </section>
      </Card>
    </Wrapper>
  );
};

export default Todos;

const Wrapper = styled.div`
  --background-color: lightblue;
  --breathing-space: 24px;

  display: grid;
  place-content: center;
  height: 100%;
`;

const Heading = styled.h1`
  text-align: center;
  margin-bottom: 64px;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  background-color: var(--background-color);
  padding: var(--breathing-space);
  display: flex;
  flex-direction: column;
  gap: var(--breathing-space);
`;

const Card = styled.div`
  height: 400px;
  width: 400px;
  margin-top: calc(var(--breathing-space) * -1);
  padding: var(--breathing-space);
  padding-top: 0px;
  background-color: var(--background-color);
  border-radius: 6px;
  filter: drop-shadow(10px 20px 32px var(--background-color));
  overflow: auto;
`;
