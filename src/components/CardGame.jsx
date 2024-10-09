import React, { useEffect } from "react";
import styles from "./CardGame.module.css";

export const CardGame = ({ date, winner, id, players, game }) => {
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
    </li>
  );
};
