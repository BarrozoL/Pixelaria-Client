import { useNavigate } from "react-router";
import "../css/WelcomeScreen.css";

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate("");
  };

  return (
    <div className="welcome-screen">
      <h1>Welcome to Pixelaria</h1>

      <button>Enter World</button>
    </div>
  );
}
