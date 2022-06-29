import styled from "styled-components";
import { Link } from "react-router-dom";

const Base = styled.button`
  padding: 1rem;
  background: ${(props) =>
    props.importance === "primary" ? "#07A0C3" : "none"};
  color: ${(props) => (props.importance === "primary" ? "white" : "#07A0C3")};
  border-radius: 4px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  font-family: sans-serif;
  border: 1px solid #07a0c3;
  margin: 0.5rem;
  display: inline-block;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:not(&:disabled):hover {
    background: ${(props) =>
      props.importance === "primary" ? "#07A0C3" : "#086788"};
  }
`;

export const Button = (props) => {
  const { importance, action, children } = props;

  if (!action) {
    return (
      <Base type="button" disabled importance={importance}>
        {children}
      </Base>
    );
  }

  if (typeof action === "string" && action.startsWith("submit:")) {
    const form = action.replace(/^submit:/i, "");
    return (
      <Base type="form" form={form} importance={importance}>
        {children}
      </Base>
    );
  }

  if (typeof action === "string") {
    return (
      <Base type="button" as={Link} to={action} importance={importance}>
        {children}
      </Base>
    );
  }

  return (
    <Base type="button" onClick={action} importance={importance}>
      {children}
    </Base>
  );
};

export default Button;
