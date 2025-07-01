// pages/HeroPage.tsx
import { Link } from "react-router-dom";
import styles from "./HeroPage.module.css";
import { Footer } from "../../components/Footer/Footer";
import { useFavoritesStore } from "../../store/useFavoriteStore";
import { useHeroPage } from "../../features/hero-page/useHeroPage";

function HeroPage() {
  const { hero, latestsComic, loading, formattedDate } = useHeroPage();
  const { toggleFavorite, isFavorited } = useFavoritesStore();

  return (
    <div className={styles.container}>
      <div className="hero-container">
        <nav className={styles.nav}>
          <Link to="/">
            <img src="/assets/logo-remove.png" alt="logo" />
          </Link>
        </nav>

        {loading ? (
          <>
            <div className={styles.skeletonContainer}>
              <div className={styles.skeletonTextBlock}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={styles.skeletonLine} />
                ))}
                <div className={`${styles.skeletonLine} ${styles.short}`} />
              </div>
              <div className={styles.skeletonImage}></div>
            </div>

            <div className={styles.latestsComics}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div className={styles.latestsComicsCard} key={i}>
                  <div className={styles.skeComicImage} />
                  <div className={`${styles.skeletonLine} ${styles.short}`} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className={styles.gridContainer}>
              <div className={styles.heroInfo}>
                <div className={styles.heroFavorite}>
                  <h1>{hero?.name}</h1>
                  {hero && (
                    <img
                      data-cy="favorite-button"
                      onClick={() => toggleFavorite(hero)}
                      src={
                        isFavorited(hero.id)
                          ? "/assets/Path.svg"
                          : "/assets/Path Copy 2.png"
                      }
                      alt="Favoritar"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
                <p className={styles.description}>
                  {hero?.description || "Sem descrição"}
                </p>

                <div className={styles.heroSeriesInfo}>
                  <div>
                    <h4>Quadrinhos</h4>
                    <div className={styles.heroBook}>
                      <img src="/assets/book.png" alt="book" />
                      <span>{hero?.comics?.available}</span>
                    </div>
                  </div>
                  <div>
                    <h4>Filmes</h4>
                    <div className={styles.heroBook}>
                      <img src="/assets/video.png" alt="book" />
                      <span>{hero?.series?.available}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.rating}>
                    <h4>Rating</h4>
                    <img src="/assets/rating.png" alt="" />
                  </div>
                  <h4>
                    Último quadrinho: <span>{formattedDate}</span>
                  </h4>
                </div>
              </div>
              <div>
                <img
                  className={styles.heroImg}
                  src={`${hero?.thumbnail.path}.${hero?.thumbnail.extension}`}
                  alt={hero?.name}
                />
              </div>
            </div>

            <h3>Últimos lançamentos</h3>
            <div className={styles.latestsComics}>
              {latestsComic.map((comic) => (
                <div className={styles.latestsComicsCard} key={comic.id}>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                  />
                  <p>{comic.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default HeroPage;
