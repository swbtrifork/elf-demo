import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Todo from "../../../interfaces/todos";

interface Props {
  onAdd: (text: Todo["text"]) => void;
}

const AddTodo = (props: Props) => {
  const { onAdd } = props;
  const [text, setText] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <Wrapper onSubmit={onSubmit}>
      <Input value={text} onChange={onChange} />
      <ButtonWrapper>
        <Button type="submit">
          <ButtonFront>Add Todo</ButtonFront>
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default React.memo(AddTodo);

const Wrapper = styled.form`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 0px -24px;
  gap: 48px;
`;

const Input = styled.input`
  resize: none;
  flex: 1;
`;

const slideIn = keyframes`
from {
  transform: translateX(calc(100% + 24px));
}
to{
  transform: translateX(0%);
}
`;

const ButtonWrapper = styled.div`
  animation: ${slideIn} 1000ms;
  animation-delay: 300ms;
  animation-fill-mode: both;
`;

const Button = styled.button`
  --border-radius: 4px;
  background-color: hsl(150deg 100% 32%);
  border-radius: var(--border-radius);
  border: none;
  padding: 0px;
  cursor: pointer;
  outline-offset: 4px;
`;

const ButtonFront = styled.span`
  display: block;
  padding: 6px 16px;
  border-radius: var(--border-radius);
  font-size: 1.25rem;
  background: hsl(155deg 100% 47%);
  color: black;
  transform: translateY(-6px);
  ${Button}:active & {
    transform: translateY(-2px);
    transition: 200ms transform;
  }
  transition: 600ms transform;
`;
