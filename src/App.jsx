import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import WelcomeScreen from "./screens/welcomeScreen";
import CardSelectionScreen from "./screens/CardSelectionScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<WelcomeScreen />} />
        <Route path={`/card-select-screen`} element={<CardSelectionScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
