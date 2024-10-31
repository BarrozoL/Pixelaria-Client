import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "../css/BattleScreen.css";
import axios from "axios";

export default function BattleScreen() {
  const [playerCards, setPlayerCards] = useState([]);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [enemies, setEnemies] = useState([]);
  const [player, setPlayer] = useState();
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const playerId = decodedToken._id;

  useEffect(() => {
    getPlayer();
    getEnemies();
  }, []);

  const getEnemies = async () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/cards`)
      .then((response) => {
        const onlyEnemyCards = response.data.filter((card) => {
          return card.category === "enemy";
        });
        setEnemies(onlyEnemyCards);
        return setCurrentEnemy(onlyEnemyCards[0]);
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

  const handleCardClick = (playerCard) => {
    //Damaging enemy
    const updatedEnemy = {
      ...currentEnemy,
      health: currentEnemy.health - playerCard.attack,
    };
    setCurrentEnemy(updatedEnemy);

    //Damaging player
    const updatedPlayerCard = {
      ...playerCard,
      health: playerCard.health - currentEnemy.attack,
    };
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      inventory: prevPlayer.inventory.map((card) =>
        card._id === updatedPlayerCard._id ? updatedPlayerCard : card
      ),
    }));

    //Bringing out new enemy after defeat
    if (updatedEnemy.health <= 0) {
      console.log("Enemy defeated!");
      const updatedEnemies = enemies.filter(
        (enemy) => enemy._id !== currentEnemy._id
      );
      setEnemies(updatedEnemies);
      setCurrentEnemy(updatedEnemies[0] || null);
      addToInventory(updatedEnemy._id);
    }
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

  const battleCycle = () => {};

  return (
    <div className="battle-screen">
      <h1>Battle!</h1>
      <div className="enemy-div">
        {currentEnemy && <div key={currentEnemy?._id}></div>}
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
            <div
              onClick={() => handleCardClick(playerCard)}
              key={playerCard._id + index}
              className="card"
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
              </div>
            </div>
          );
        })}
      </div>
      {enemies.length === 0 ? (
        <p style={{ fontSize: "200px" }}>VICTORY!!!</p>
      ) : null}
    </div>
  );
}
