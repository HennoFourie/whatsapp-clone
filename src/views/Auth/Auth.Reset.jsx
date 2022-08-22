import React from 'react';
import { useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { context } from "./Auth.context";
import { useNavigate } from "react-router-dom";

import { PATHS } from "../../helpers/paths";
import { checkEmail } from "../../helpers/validation";
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
export const Reset = () => {
  const { resetPassword } = useContext(context);

  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [phase, setPhase] = useState("resting");
  const [email, setEmail] = useState("");

  const handleAlert = (alert) => {
    setPhase("resting");
    setAlert(alert);
  };

  const handleEmail = (value) => {
    if (alert) setAlert(null);
    setEmail(value);
  };

  const handleReset = async () => {
    setPhase("checking");

    const emailAlert = checkEmail(email);
    if (emailAlert) return handleAlert(emailAlert);

    const response = await resetPassword({ email });
    if (response.alert) return handleAlert(response.alert);

    console.log(response.user);
    navigate(PATHS.profile.landing);
  };

  return (
    <div>
      <h1>Reset Password</h1>

      <div>
        <Field
          label="Email"
          type="email"
          onChange={phase === "resting" && handleEmail}
          value={email}
        />
      </div>

      {alert && <Alert>{alert}</Alert>}

      <div>
        <Button action={PATHS.auth.login}>Cancel</Button>
      </div>

      <div>
        {" "}
        <Button
          importance="primary"
          action={phase === "resting" && handleReset}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default Reset;
