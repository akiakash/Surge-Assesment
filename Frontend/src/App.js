import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "../src/pages/ResetPassword";
import AddNotes from "./pages/Notes/AddNotes";
import UpdateNotes from "./pages/Notes/UpdateNotes";
import ViewNotes from "./pages/Notes/ViewNotes";
import Profile from "./pages/Profile";
import Userlist from "./pages/Userlist";

function App() {
  const [auth, setAuth] = useState(false);
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        <Route
          path="/"
          element={
            auth ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/addnotes" element={<AddNotes />} />
        <Route path="/updatenotes" element={<UpdateNotes />} />
        <Route path="/viewnotes" element={<ViewNotes />} />
        <Route path="/updateprofile" element={<Profile />} />
        <Route path="/userlist" element={<Userlist />} />
      </Routes>
    </>
  );
}

export default App;
