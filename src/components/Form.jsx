import React, { useState } from "react";
import Select from "react-select";
import styles from "./Form.module.css";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const Form = ({ game, players }) => {
  const [player, setPlayer] = useState("");
  const [playersState, setPlayersState] = useState(players);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Establece la fecha en el formato correcto

  const options = playersState.map((player) => ({
    value: player.values.id,
    label: player.values.name,
  }));

  const onAdd = (e) => {
    e.preventDefault();
    if (player) {
      const newPlayer = { name: player, id: crypto.randomUUID() };
      setPlayersState((prevPlayers) => [...prevPlayers, newPlayer]);
      setPlayer("");
    }
  };

  const onDelete = (id) => {
    const updatedPlayers = playersState.filter(
      (player) => player.values.id !== id
    );
    setPlayersState(updatedPlayers);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const saveGameToFirestore = async (newGame) => {
    try {
      await addDoc(collection(db, "gamesPlayed"), newGame);
      console.log("Partida guardada en Firestore");
    } catch (error) {
      console.error("Error al guardar la partida:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGame = {
      game,
      date,
      playersState,
      timestamp: Date.now(),
    };
    await saveGameToFirestore(newGame);
    window.location.href = `/games/${game}`;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
        <div className={styles.newPlayer}>
          {/* <input
            type="text"
            placeholder="Nombre"
            onChange={(e) => setPlayer(e.target.value)}
            value={player}
          /> */}
          <Select name="players" options={options} className="" isMulti />
          <button className={styles.button} type="button" onClick={onAdd}>
            Agregar
          </button>
        </div>
        <ul>
          {playersState.map((player) => (
            <li key={player.values.id} className={styles.listPlayers}>
              <p>{player.values.name}</p>
              <div className={styles.buttons}>
                <button
                  className={styles.deletePlayer}
                  type="button"
                  onClick={() => onDelete(player.values.id)}
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
                      d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7 0.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className={styles.button} href={`/games/${game}`}>
        Guardar Partida
      </button>
    </form>
  );
};
