// pages/Home.tsx
import styles from "./Home.module.css";
import { useHome } from "../../features/home/useHome";
import HeroesList from "../../components/HeroList/HeroList";
import { InputSearch } from "../../components/InputSearch/InputSearch";
import { Footer } from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

function Home() {
  const {
    data,
    toggleSortOrder,
    sortOrder,
    handleShowFavorites,
    showOnlyFavorites,
    searchHero,
    setSearchHero,
    handleSearchHero,
  } = useHome();

  return (
    <div className={styles.container}>
      <div className="hero-container">
        <nav className={styles.nav}>
          <Link to="/">
            <img src="assets/Group.png" alt="logo" />
          </Link>
          <h1>EXPLORE O UNIVERSO</h1>
          <span>
            Mergulhe no domínio deslumbrante de todos os personagens clássicos
            que você mais ama - e aqueles que você descobrirá em breve
          </span>
          <div className={styles.searchContainer}>
            <img
              src="assets/Shape.png"
              alt="Buscar"
              className={styles.searchIcon}
            />
            <form>
              <InputSearch
                searchHero={searchHero}
                setSearchHero={setSearchHero}
                handleSearchHero={handleSearchHero}
              />
            </form>
          </div>
        </nav>

        <div className={styles.headerFilters}>
          <span className={styles.list}>Encontrados {data.length} heróis</span>
          <div className={styles.filters}>
            <div className={styles.orderFilter}>
              <img src="assets/superhero.png" alt="" />
              <span>Ordenar por nome - A/Z</span>
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
                  showOnlyFavorites
                    ? "assets/Path.svg"
                    : "assets/Path Copy 2.png"
                }
                alt="favorites"
              />
              <span>Somente favoritos</span>
            </div>
          </div>
        </div>

        <HeroesList heroes={data} showOnlyFavorites={showOnlyFavorites} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
