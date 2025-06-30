import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import HeroesList from "../../components/HeroList";
import { getCharacters } from "../../services/marvel";
import type { Heroes } from "../../models/Heroes";

function Home() {
  const [data, setData] = useState<Heroes[]>([]);

  const loadHeroes = async () => {
    const heroes = await getCharacters();
    setData(heroes);
  };

  useEffect(() => {
    loadHeroes();
  }, []);

  return (
    <div className={styles.button}>
      <img src="assets/Group.png" alt="" />
      <h1>EXPLORE O UNIVERSO</h1>
      <p>
        Mergulhe no domínio deslumbrante de todos os personagens clássicos que
        você mais ama - e aqueles que você descobrirá em breve
      </p>
      <input type="text" />
      <HeroesList heroes={data} />
    </div>
  );
}

export default Home;
