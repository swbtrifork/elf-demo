import { useObservable } from "@ngneat/react-rxjs";
import { useState } from "react";
import styled from "styled-components";
import {
  addTodo,
  deleteTodo,
  todos$,
  updateTodoCompleted,
} from "../../store/auth.repository";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const Todos = () => {
  const [todos] = useObservable(todos$);
  const [animated, setStartAnimation] = useState(false);

  return (
    <Wrapper>
      <Heading>TODOS</Heading>
      <Card>
        <Header>
          <AddTodo onAdd={addTodo}></AddTodo>
        </Header>

        <section>
          {todos.map((todo) => {
            return (
              <TodoItem
                animated={animated}
                setStartAnimation={setStartAnimation}
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
  padding: 24px;
`;

const Card = styled.div`
  height: 300px;
  width: 300px;
  margin-top: -24px;
  padding: 24px;
  padding-top: 0px;
  background-color: var(--background-color);
  border-radius: 6px;
  filter: drop-shadow(10px 20px 32px var(--background-color));
  overflow: auto;
`;
