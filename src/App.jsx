import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";

import { UserProvider } from "./context/UserContext";
import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <header>
          <Link to="/">Page Accueil</Link><br />
          <Link to="/register">Inscription</Link><br />
          <Link to="/login">Connexion</Link>
        </header>
        <Routes>
          <Route index element={<p>Page Accueil</p>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
