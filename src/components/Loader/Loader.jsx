import React from 'react';
import styled, { keyframes } from "styled-components";

const spin = keyframes`
0% { transform: rotate(0deg)}
  100% { transform: rotate(360deg)}
`;

const Spinner = styled.div`
  border: 0.5rem solid #f3f3f3; /* Light grey */
  border-top: 0.5rem solid #086788; /* Blue */
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation-name: ${spin};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  display: inline-block;
  padding: 0.5rem;
`;

const Text = styled.div`
  font-family: sans-serif;
  font-size: 1rem;
`;

const Base = styled.label``;

export const Loader = (props) => {
  const { value } = props;

  return (
    <Base>
      <Spinner />
      <Text>{value}</Text>
    </Base>
  );
};

export default Loader;
