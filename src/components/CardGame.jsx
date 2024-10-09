import React, { useEffect } from "react";
import styles from "./CardGame.module.css";

export const CardGame = ({ date, winner, id, players, game, onDelete }) => {
  const playersNames = players.map((player) => player.name).join(", ");
  useEffect(() => {
    console.log(game);
  }, [id]);

  return (
    <li className={styles.linkCard} key={id}>
      <a className={styles.winners} href={`/games/${game}/${id}`}>
        <div>
          <h2>Partida {id}</h2>
          <div>
            <span className="winner">Ganador</span>: {winner}
          </div>
          <div>Participantes: {playersNames}</div>
          <span className="date">{date}</span>
        </div>
      </a>
      <button className={styles.button} onClick={() => onDelete(id)}>
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
    </li>
  );
};
