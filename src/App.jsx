import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import WelcomeScreen from "./screens/welcomeScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={`/`} element={<WelcomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
