import { useObservable } from "@ngneat/react-rxjs";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { TodosFilterProps } from "../../../interfaces/todos";
import { RootState } from "../../../reduxStore/store";
import { setTodoFilter } from "../../../reduxStore/todofilters";
import { filter$, updateTodosFilter } from "../../../store/todos.repository";

interface Props {
  type: "ELF" | "REDUX";
}

const TodosFilter = (props: Props) => {
  const { type } = props;
  const options: TodosFilterProps["filter"][] = ["ALL", "ACTIVE", "COMPLETED"];

  const dispatch = useDispatch();
  const [filter] = useObservable(filter$);
  const reduxFilter = useSelector(
    (state: RootState) => state.todoFilter.filter
  );

  return (
    <Wrapper>
      {options.map((text) => {
        return (
          <Anchor
            key={text}
            onClick={() => {
              type === "ELF"
                ? updateTodosFilter(text)
                : dispatch(setTodoFilter({ filter: text }));
            }}
            chosen={type === "ELF" ? filter === text : reduxFilter === text}
          >
            {text}
            <Revealed>{text}</Revealed>
          </Anchor>
        );
      })}
    </Wrapper>
  );
};

export default TodosFilter;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0px -24px;
`;

const Anchor = styled.a<{ chosen: boolean }>`
  display: block;
  position: relative;
  text-decoration: none;
  color: ${(props) => (props.chosen ? "hsl(333deg 100% 50%)" : "inherit")};
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
`;

const Revealed = styled.span`
  color: hsl(333deg 100% 50%);
  position: absolute;
  top: 0;
  left: 0;
  filter: drop-shadow(0px 0px 4px lightblue);
  clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%);
  transition: 800ms clip-path;

  ${Anchor}:hover & {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: 400ms;
  }
`;
