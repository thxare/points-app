import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";

export const Form = () => {
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState([]);
  const [date, setDate] = useState(new Date());

  const onAdd = (e) => {
    e.preventDefault();
    if (player) {
      const newPlayer = { name: player, id: crypto.randomUUID() };
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      setPlayer("");
    }
  };
  const onDelete = (id) => {
    const playerDeleted = players.filter((player) => player.id !== id);
    setPlayers(playerDeleted);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };
  useEffect(() => {
    console.log("Lista de jugadores actualizada:", players);
  }, [players]);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <div>
        <label>Fecha</label>
        <input
          type="date"
          className={styles.calendar}
          value={date}
          onChange={handleDate}
        />
      </div>
      <div className={styles.players}>
        <label>Participantes</label>
        <ul>
          {players.map((player, index) => (
            <li key={index} className={styles.listPlayers}>
              <p>{player.name}</p>
              <div className={styles.buttons}>
                <button
                  className={styles.deletePlayer}
                  onClick={() => onDelete(player.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={10}
                    height={10}
                    viewBox="0 0 14 14"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.newPlayer}>
          <input
            type="text"
            placeholder="Nombre"
            onChange={(e) => setPlayer(e.target.value)}
            value={player}
          />
          <button className={styles.button} type="button" onClick={onAdd}>
            Agregar
          </button>
        </div>
      </div>
    </form>
  );
};
``;
