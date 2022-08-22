import React from 'react';
import { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { context } from "./Auth.context";
import { useNavigate } from "react-router-dom";

import { PATHS } from "../../helpers/paths";
import {
  checkConfirm,
  checkEmail,
  checkPassword,
} from "../../helpers/validation";
import { Field } from "../../components/Field";
import { Button } from "../../components/Button";

const pop = keyframes`
  from { opacity: 0; transform: scale(0.5)}
  to { opacity: 1; transform: scale(1)}
`;

const Alert = styled.p`
  margin: 1rem 0;
  padding: 1rem 2rem;
  display: inline-block;
  border-radius: 8px;
  background: #fcdd00;
  color: #d00000;
  animation-name: ${pop};
  animation-duration: 0.3s;
`;
export const Create = () => {
  const { signUp } = useContext(context);

  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [phase, setPhase] = useState("resting");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleAlert = (alert) => {
    setPhase("resting");
    setAlert(alert);
  };

  const handleEmail = (value) => {
    if (alert) setAlert(null);
    setEmail(value);
  };

  const handlePassword = (value) => {
    if (alert) setAlert(null);
    setPassword(value);
  };

  const handleConfirm = (value) => {
    if (alert) setAlert(null);
    setConfirm(value);
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setPhase("checking");

    const emailAlert = checkEmail(email);
    const passwordAlert = checkPassword(password);
    const confirmAlert = checkConfirm(confirm, password);

    if (emailAlert) return handleAlert(emailAlert);
    if (passwordAlert) return handleAlert(passwordAlert);
    if (confirmAlert) return handleAlert(confirmAlert);

    const response = await signUp({ email, password });
    if (response.alert) return handleAlert(response.alert);
    navigate(PATHS.auth.email);
  };

  return (
    <div>
      <h1>Create Account</h1>

      <form id="create" onSubmit={handleCreate}>
        <div>
          <Field
            label="Email"
            type="email"
            onChange={phase === "resting" && handleEmail}
            value={email}
          />
        </div>

        <div>
          <Field
            label="Password"
            type="password"
            onChange={phase === "resting" && handlePassword}
            value={password}
          />
        </div>

        <div>
          <Field
            label="Confirm Password"
            type="password"
            onChange={phase === "resting" && handleConfirm}
            value={confirm}
          />
        </div>
      </form>

      {alert && <Alert>{alert}</Alert>}

      <div>
        <Button action={PATHS.auth.landing}>Cancel</Button>
      </div>

      <div>
        {" "}
        <Button
          importance="primary"
          action={phase === "resting" && "submit:create"}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default Create;
