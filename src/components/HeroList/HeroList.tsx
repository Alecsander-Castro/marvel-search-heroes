import { Link } from "react-router-dom";
import styles from "./HeroList.module.css";
import type { Heroes } from "../../models/Heroes";

interface HeroesListProps {
  heroes: Heroes[];
  favorites: Heroes[];
  toggleFavorite: (hero: Heroes) => void;
  showOnlyFavorites: boolean;
}

function HeroesList({ heroes, favorites, toggleFavorite }: HeroesListProps) {
  return (
    <div className={styles.container}>
      {heroes.map((hero) => (
        <div className={styles.card} key={hero.id}>
          <Link to={`/hero-page/${hero.id}`}>
            <img
              className={styles.heroImg}
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
              alt={hero.name}
            />
            <div className={styles.heroInfo}>
              <p>{hero.name}</p>
              <img
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(hero);
                }}
                src={
                  favorites.some((fav) => fav.id === hero.id)
                    ? "/assets/Path.svg"
                    : "/assets/Path Copy 2.png"
                }
                alt="Favoritar"
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default HeroesList;
