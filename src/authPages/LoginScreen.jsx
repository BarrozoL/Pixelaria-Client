import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("authToken", response.data.authToken);
      navigate("/card-select-screen");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmits = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("authToken", response.data.authToken); // Store token
      navigate("/profile"); // Redirect to profile or another page after login
    } catch (error) {
      console.error("Error during login", error.response.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Email:{" "}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        Password:
        <input
          type="passoword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Enter World</button>
      </form>
    </div>
  );
}
