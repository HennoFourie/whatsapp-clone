import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./helpers/supabase";
import { Auth } from "./views/Auth";
import { Profile } from "./views/Profile";

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
