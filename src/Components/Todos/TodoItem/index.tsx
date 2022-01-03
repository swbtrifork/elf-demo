import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Todo from "../../../interfaces/todos";

interface Props {
  todo: Todo;
  onClick: (id: Todo["id"]) => void;
  onDelete: (id: Todo["id"]) => void;
}

const TodoItem = (props: Props) => {
  const { onClick, onDelete, todo } = props;
  const [animate, setAnimate] = useState(false);

  const handleOnClick = () => {
    onClick(todo.id);
  };

  const handleOnDelete = () => {
    setAnimate(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 400);
  };

  return (
    <Wrapper
      animate={animate}
      onClick={handleOnClick}
      backgroundColor={props.todo.completed}
    >
      <InnerWrapper>
        <span>{todo.text}</span>

        <Button onClick={handleOnDelete}>Delete</Button>
      </InnerWrapper>
    </Wrapper>
  );
};

export default React.memo(TodoItem);

const fadeOut = keyframes`
from{
  opacity: 1;
}
to{
  opacity: 0;
}
`;

const Wrapper = styled.div<{ backgroundColor: boolean; animate: boolean }>`
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
  animation: ${(props) =>
    props.animate
      ? css`
          ${fadeOut} 200ms
        `
      : undefined};
  animation-fill-mode: both;
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
