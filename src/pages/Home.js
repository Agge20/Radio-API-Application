import React from "react";
import { useHistory } from "react-router-dom";
import styles from "../styles/HomeS.module.css";

const Home = () => {

  const history = useHistory();
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.banner_wrapper}>
        <h1>Välkommen till SE-Radio</h1>
      </div>
      <div className={styles.info_wrapper}>
        <h2>Radiounderhållning i världsklass</h2>
        <p>
          All Gaul is divided into three parts, one of which the Belgae inhabit,
          the Aquitani another, those who in their own language are called
          Celts, in our Gauls, the third. All these differ from each other in
          language, customs and laws. The river Garonne separates the Gauls from
          the Aquitani; the Marne and the Seine separate them from the Belgae.{" "}
        </p>
      </div>
      <button
        onClick={() => {
          history.push(`/all-channels`);
        }}
      >
        Gå till kanalerna
      </button>
    </div>
  );
};

export default Home;
