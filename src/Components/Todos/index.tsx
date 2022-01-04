import { useDispatch } from "react-redux";
import styled from "styled-components";
import Todo from "../../interfaces/todos";
import {
  addReduxTodo,
  deleteReduxTodo,
  updateReduxTodo,
} from "../../reduxStore/todos";
import {
  addTodo,
  deleteTodo,
  updateTodoCompleted,
} from "../../store/todos.repository";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";
import TodosFilter from "./TodosFilter";

interface Props {
  todos: Todo[];
  type: "ELF" | "REDUX";
}

const Todos = (props: Props) => {
  const { todos, type } = props;

  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Heading>{type}</Heading>
      <Card>
        <Header>
          <TodosFilter type={type}></TodosFilter>
          <AddTodo
            onAdd={(text: Todo["text"]) =>
              type === "ELF" ? addTodo(text) : dispatch(addReduxTodo(text))
            }
          ></AddTodo>
        </Header>

        <section>
          {todos.map((todo) => {
            return (
              <TodoItem
                todo={todo}
                key={todo.id}
                onClick={() =>
                  type === "ELF"
                    ? updateTodoCompleted(todo.id)
                    : dispatch(updateReduxTodo(todo.id))
                }
                onDelete={() =>
                  type === "ELF"
                    ? deleteTodo(todo.id)
                    : dispatch(deleteReduxTodo(todo.id))
                }
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
