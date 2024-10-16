import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../css/BattleScreen.css";
import axios from "axios";

export default function BattleScreen() {
  const [playerCards, setPlayerCards] = useState([]);
  const [currentEnemy, setCurrentEnemy] = useState();
  const [enemies, setEnemies] = useState([]);
  const [player, setPlayer] = useState();
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const playerId = decodedToken._id;

  useEffect(() => {
    getPlayer();
    getEnemies();

    //setting the currentEnemy to the first enemy in enemies array
    if (enemies.length > 0) {
      setCurrentEnemy(enemies[currentEnemyCounter]);
    }
  }, [enemies]);

  const currentEnemyCounter = 0; //need to increment it every time an enemy is defeated, to get the next enemy

  const getEnemies = async () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/cards/enemy-cards`)
      .then((response) => {
        setEnemies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enemies:", error);
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

  return (
    <div>
      <h1>Battle!</h1>
      <div className="enemy-div">
        {currentEnemy && <div key={currentEnemy._id}></div>}
        <div className="enemy-stats-container">
          <div>{currentEnemy?.name}</div>
          <div>Health: {currentEnemy?.health}</div>
          <div>Attack power: {currentEnemy?.attack}</div>
        </div>
        <img className="current-enemy-image" src={currentEnemy?.image} />
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
    </div>
  );
}
