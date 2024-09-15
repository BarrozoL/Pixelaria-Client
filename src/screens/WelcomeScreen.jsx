import { useNavigate } from "react-router";
import "../css/WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleCreateAccountClick = () => {
    navigate("/auth/signup");
  };

  const handleLoginClick = () => {
    navigate("/auth/login");
  };

  return (
    <div className="welcome-screen">
      <h1>Welcome to Pixelaria</h1>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleCreateAccountClick}>Create Account</button>
    </div>
  );
}
