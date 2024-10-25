import React, { useEffect, useState } from "react";
import styles from "./GameList.module.css";
import { db } from "../lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { CardGame } from "./CardGame.jsx";

const GameList = ({ game }) => {
  const [gamesPlayed, setGamesPlayed] = useState([]);

  const loadGamesFromFirestore = async () => {
    const gamesQuery = query(
      collection(db, "gamesPlayed"),
      where("game", "==", game)
    );
    const querySnapshot = await getDocs(gamesQuery);
    const games = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      games.push({ id: doc.id, ...data });
    });
    setGamesPlayed(games);
  };

  const onDelete = async (id) => {
    try {
      const docRef = doc(db, "gamesPlayed", id);
      await deleteDoc(docRef);

      const cardDeleted = gamesPlayed.filter((game) => game.id !== id);
      setGamesPlayed(cardDeleted);
    } catch (error) {
      console.error("Error al eliminar el documento: ", error);
    }
  };

  useEffect(() => {
    loadGamesFromFirestore();
  }, [game]);

  useEffect(() => {}, [gamesPlayed]);

  return (
    <ul role="list" className={styles.linkCardGrid}>
      {gamesPlayed.length > 0 ? (
        gamesPlayed.map((gameData) => {
          return (
            <CardGame
              key={gameData.id}
              date={gameData.date}
              game={game}
              // winner={gameData.winner}
              id={gameData.id}
              players={gameData.players}
              onDelete={onDelete}
            />
          );
        })
      ) : (
        <p>No hay partidas registradas</p>
      )}
    </ul>
  );
};

export default GameList;
