import React, { useState } from "react";
import styles from "./Form.module.css";
import { db } from "../lib/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const Form = ({ game }) => {
  const [player, setPlayer] = useState("");
  const [players, setPlayers] = useState([
    { name: "Thiare", id: crypto.randomUUID() },
  ]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Establece la fecha en el formato correcto

  const onAdd = (e) => {
    e.preventDefault();
    if (player) {
      const newPlayer = { name: player, id: crypto.randomUUID() };
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      setPlayer("");
    }
  };

  const onDelete = (id) => {
    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
  };

  // Función para manejar la fecha
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const saveGameToFirestore = async (newGame) => {
    console.log(newGame);
    try {
      await addDoc(collection(db, "gamesPlayed"), newGame);
      console.log("Partida guardada en Firestore");
    } catch (error) {
      console.error("Error al guardar la partida:", error);
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGame = {
      game,
      date,
      players,
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
        <ul>
          {players.map((player) => (
            <li key={player.id} className={styles.listPlayers}>
              <p>{player.name}</p>
              <div className={styles.buttons}>
                <button
                  className={styles.deletePlayer}
                  type="button"
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
      <button className={styles.button} type="submit">
        Guardar Partida
      </button>
    </form>
  );
};
