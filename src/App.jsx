import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import WelcomeScreen from "./screens/welcomeScreen";
import CardSelectionScreen from "./screens/CardSelectionScreen";

//auth
import SignupScreen from "./authPages/SignupScreen";
import LoginScreen from "./authPages/LoginScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<WelcomeScreen />} />
        <Route path={`/card-select-screen`} element={<CardSelectionScreen />} />

        <Route path={"/auth/signup"} element={<SignupScreen />} />
        <Route path={"/auth/login"} element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
