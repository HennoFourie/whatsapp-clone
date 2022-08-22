import React from 'react';
import styled from "styled-components";

const Base = styled.label`
  position: relative;
  margin: 1rem 0.5rem;
  display: inline-block;
`;

const Text = styled.div`
  font-family: sans-serif;
  position: absolute;
  top: 0.7rem;
  left: 1rem;
  font-size: 0.8rem;
  opacity: 0.5;
`;

const Input = styled.input`
  padding: 1.5rem 1rem 0.5rem;
  font-size: 1.1rem;
  color: black;
  background: #eee;
  border-width: 0;
  border-radius: 4px;
  width: 100%;

  &:disabled {
    opacity: 0.3;
  }
`;

export const Field = (props) => {
  const { label, value, onChange, type = "text" } = props;

  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <Base>
      <Text>{label}</Text>
      <Input
        type={type}
        onChange={handleChange}
        disabled={!onChange}
        value={value}
      />
    </Base>
  );
};

export default Field;
