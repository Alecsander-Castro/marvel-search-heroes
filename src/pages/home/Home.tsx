import styles from "./Home.module.css";

import { useHome } from "../../features/home/useHome";
import HeroesList from "../../components/HeroList/HeroList";
import type React from "react";

function Home() {
  const {
    data,
    toggleSortOrder,
    sortOrder,
    searchHero,
    setSearchHero,
    handleSearchHero,
    handleShowFavorites,
    favorites,
    toggleFavorite,
    showOnlyFavorites,
  } = useHome();

  return (
    <div>
      <nav className={styles.nav}>
        <img src="assets/Group.png" alt="" />
        <h1>EXPLORE O UNIVERSO</h1>
        <span>
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você mais ama - e aqueles que você descobrirá em breve
        </span>
        <div className={styles.searchContainer}>
          <img
            src="assets/Shape.png"
            alt="Buscar"
            className={styles.searchIcon}
          />
          <form>
            <input
              value={searchHero}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchHero(e.target.value)
              }
              onKeyDown={handleSearchHero}
              type="text"
              placeholder="Procure por heróis"
            />
          </form>
        </div>
      </nav>
      <div className={styles.headerFilters}>
        <span className={styles.list}>Encontrados {data.length} heróis</span>
        <div className={styles.filters}>
          <div className={styles.orderFilter}>
            <img src="assets/superhero.png" alt="" />
            <span>Ordernar por nome - A/Z</span>
            <img
              onClick={toggleSortOrder}
              className={styles.toggle}
              src={sortOrder ? "assets/Group 2.svg" : "assets/Group 6.png"}
              alt="toggle"
            />
          </div>
          <div onClick={handleShowFavorites} className={styles.favorites}>
            <img
              src={
                showOnlyFavorites ? "assets/Path.png" : "assets/Path Copy 2.png"
              }
              alt="favorites"
            />
            <span>Somente favoritos</span>
          </div>
        </div>
      </div>
      <HeroesList
        heroes={data}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        showOnlyFavorites={showOnlyFavorites}
      />
    </div>
  );
}

export default Home;
