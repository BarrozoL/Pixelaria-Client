import { useState, useEffect } from "react";
import axios from "axios";
import "../css/CardSelectionScreen.css";

export default function CardSelectionScreen() {
  const [playerCards, setPlayerCards] = useState([]);
  const [enemyCards, setEnemyCards] = useState([]);

  useEffect(() => {
    getCards();
  }, []);

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

  return (
    <>
      <div className="card-select-screen">
        <h1>Select and equip your cards!</h1>
        <div className="card-inventory">
          {playerCards &&
            playerCards.map((playerCard) => {
              return (
                <div className="card">
                  {console.log(playerCard)}
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
      </div>

      <div className="player-inventory"></div>
    </>
  );
}
