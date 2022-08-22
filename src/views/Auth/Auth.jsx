import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Login } from "./Auth.Login";
import { Create } from "./Auth.Create";
import { Reset } from "./Auth.Reset";
import { PATHS } from "../../helpers/paths";
import { Button } from "../../components/Button";
import { Shell } from "../../components/Shell";

const Landing = () => {
  return (
    <div>
      <h1>Hello! Welcome!</h1>

      <Button action={PATHS.auth.login}>Login</Button>

      <Button importance="primary" action={PATHS.auth.create}>
        Create Account
      </Button>
    </div>
  );
};

const Email = () => {
  return (
    <div>
      <h1>Confirmation</h1>

      <p>
        An email has been sent to your email address, please click on the
        confirmation link in order to finish creation of the account.
      </p>

      <Button importance="primary" action={PATHS.auth}>
        Back
      </Button>
    </div>
  );
};

export const Auth = () => {
  return (
    <Shell>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/" element={<Landing />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </Shell>
  );
};

export default Auth;
