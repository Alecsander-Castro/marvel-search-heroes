// components/HeroList/HeroList.tsx
import { Link } from "react-router-dom";
import styles from "./HeroList.module.css";
import type { Heroes } from "../../models/Heroes";
import { useFavoritesStore } from "../../store/useFavoriteStore";

interface HeroesListProps {
  heroes: Heroes[];
  showOnlyFavorites: boolean;
}

function HeroesList({ heroes }: HeroesListProps) {
  const { toggleFavorite, isFavorited } = useFavoritesStore();

  return (
    <div className={styles.container}>
      {heroes.map((hero) => (
        <div className={styles.card} key={hero.id} data-cy="hero-card">
          <Link to={`/hero-page/${hero.id}`}>
            <img
              className={styles.heroImg}
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
              alt={hero.name}
            />
            <div className={styles.heroInfo}>
              <p>{hero.name}</p>
              <img
                data-cy="favorite-button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(hero);
                }}
                src={
                  isFavorited(hero.id)
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
