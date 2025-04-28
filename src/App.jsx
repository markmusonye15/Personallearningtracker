import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Fixed imports
import "./App.css"; // Importing CSS file

import { AuthProvider } from "./context/AuthContext";
import { SkillProvider } from "./context/SkillContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";


import LoginPage from "./components/LoginPage";
import SkillList from "./pages/SkillList";
import AddSkill from "./pages/AddSkill";
import EditSkill from "./pages/EditSkill";


function App() {
  return (
    <Router>
      {" "}
      
      <AuthProvider>
        <SkillProvider>
          <Navbar />
          
          <Routes>
            {" "}
            
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/skills"
              element={
                <PrivateRoute>
                  <SkillList />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <AddSkill />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditSkill />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </SkillProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
