import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";

import { UserProvider } from "./context/UserContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";


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
          <Route path="/" element={<p>Page Accueil</p>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;

// Lien vers le sujet du TP : 
// https://sysentive.notion.site/TP-cr-ation-d-une-application-React-avec-authentification-et-tableau-de-bord-18ca84550c768022a92cc776f7b52b64