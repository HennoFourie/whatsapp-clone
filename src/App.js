import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./helpers/supabase";
import { Auth } from "./views/Auth";
import { Profile } from "./views/Profile";

const test = async () => {
  const { access_token: token } = supabase.auth.session();

  const response = await fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify({
      image: "newimage",
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);
};

test();

export const App = () => {
  const user = supabase.auth.user();
  const isSignedIn = Boolean(user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route
            path="/"
            element={<Navigate to={isSignedIn ? "/profile/" : "/auth/"} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
