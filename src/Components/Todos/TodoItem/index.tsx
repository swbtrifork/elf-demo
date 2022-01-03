import React from "react";
import styled, { keyframes } from "styled-components";
import Todo from "../../../interfaces/todos";

interface Props {
  todo: Todo;
  onClick: (id: Todo["id"]) => void;
  onDelete: (id: Todo["id"]) => void;
  setStartAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  animated: boolean;
}

const TodoItem = (props: Props) => {
  const { onClick, onDelete, todo } = props;

  const handleOnClick = () => {
    props.setStartAnimation(true);
    onClick(todo.id);
    props.setStartAnimation(false);
  };

  return (
    <Wrapper
      onClick={handleOnClick}
      animated={props.animated}
      backgroundColor={props.todo.completed}
    >
      <InnerWrapper>
        <span>{todo.text}</span>

        <Button onClick={() => onDelete(todo.id)}>Delete</Button>
      </InnerWrapper>
    </Wrapper>
  );
};

export default React.memo(TodoItem);

const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
  }`;

const Wrapper = styled.div<{ backgroundColor: boolean; animated: boolean }>`
  --radius: 12px;
  --padding: 6px;

  margin-bottom: 12px;
  background-color: ${(props) =>
    props.backgroundColor ? "hsl(150deg 100% 45%)" : "hsl(350deg 100% 45%)"};
  padding: var(--padding);
  border-radius: var(--radius);
  //This is for the moat
  box-shadow: inset 2px 2px 8px hsl(140deg 0% 0% / 0.33);
  overflow: hidden;

  transition: 300ms background-color;

  animation: ${fadeIn} 1000ms;
`;

const InnerWrapper = styled.div`
  border-radius: calc(var(--radius) - var(--padding));
  box-shadow: 2px 2px 8px hsl(140deg 0% 0% / 0.33);
  background: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Button = styled.button`
  background-color: hsl(350deg 100% 45% / 0.9);
  border: none;
  border-radius: 4px;
  padding: 8px;
  font-size: 1rem;
  color: whitesmoke;
  cursor: pointer;
  &:hover,
  &:focus {
    transform: scale(1.1);
    transition: 200ms transform;
  }
  transition: 600ms transform;
`;
