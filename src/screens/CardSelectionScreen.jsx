import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "../css/CardSelectionScreen.css";

export default function CardSelectionScreen() {
  const [playerCards, setPlayerCards] = useState([]);
  const [player, setPlayer] = useState();
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const playerId = decodedToken._id;
  const navigate = useNavigate();

  useEffect(() => {
    getCards();
    getPlayer();
  }, []);

  const handleNavigateToBattle = () => {
    navigate("/battle-screen");
  };

  const getCards = async () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/cards/player-cards`)
      .then((response) => {
        setPlayerCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching player cards:", error);
      });
  };

  const getPlayer = async () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/player/${playerId}`)
      .then((response) => {
        setPlayer(response.data);
      })
      .catch((error) => {
        console.error("Error fetching player:", error);
      });
  };

  const addToInventory = async (cardId) => {
    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/api/player/inventory`, {
        playerId: playerId,
        cardId: cardId,
      })
      .then((response) => {
        getPlayer();
      })
      .catch((error) => {
        console.log("Error adding card to player inventory:", error);
      });
  };

  return (
    <>
      <div className="card-select-screen">
        <h1>Select and equip your cards!</h1>
        <button
          onClick={handleNavigateToBattle}
          className="start-battle-button"
        >
          Start Battle
        </button>
        <div className="card-book">
          {playerCards &&
            playerCards.map((playerCard) => {
              return (
                <div
                  key={playerCard._id}
                  className="card"
                  data-_id={playerCard._id}
                >
                  <p className="card-name">{playerCard.name}</p>
                  <img className="card-img" src={playerCard.image} />
                  <div className="stats-container">
                    <p className="player-card-health">
                      Health: {playerCard.health}
                    </p>
                    <p className="player-card-attack">
                      Attack: {playerCard.attack}
                    </p>
                    <p className="player-card-specialAttack">
                      {playerCard.specialAttack}
                    </p>
                    <button onClick={() => addToInventory(playerCard._id)}>
                      Equip
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="player-inventory">
        {player?.inventory.map((playerCard, index) => {
          return (
            <div key={playerCard._id + index} className="card">
              <p className="card-name">{playerCard.name}</p>
              <img className="card-img" src={playerCard.image} />
              <div className="stats-container">
                <p className="player-card-health">
                  Health: {playerCard.health}
                </p>
                <p className="player-card-attack">
                  Attack: {playerCard.attack}
                </p>
                <p className="player-card-specialAttack">
                  {playerCard.specialAttack}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
