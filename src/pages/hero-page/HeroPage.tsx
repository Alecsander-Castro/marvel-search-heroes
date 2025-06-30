// pages/HeroPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCharacterById,
  getLatestComicByCharacterId,
} from "../../services/marvel";
import type { Heroes } from "../../models/Heroes";
import type { Comic } from "../../models/Comic";

function HeroPage() {
  const { id } = useParams();
  const [hero, setHero] = useState<Heroes | null>(null);
  const [latestsComic, setLatestsComic] = useState<Comic[]>([]);

  const onsale = latestsComic[0]?.dates.find(
    (d) => d.type === "onsaleDate"
  )?.date;

  const formattedDate = onsale
    ? new Date(onsale).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  useEffect(() => {
    async function loadHero() {
      if (!id) return;

      const character = await getCharacterById(Number(id));
      const comic = await getLatestComicByCharacterId(Number(id));

      setHero(character);
      setLatestsComic(comic);
    }

    loadHero();
  }, [id]);

  return (
    <div>
      <h1>{hero?.name}</h1>
      <p>{hero?.description || "Sem descrição"}</p>

      <div>
        <p>Quadrinhos: {hero?.comics?.available}</p>
        <p>Séries: {hero?.series?.available}</p>
      </div>
      <div>
        <p>Lançamento: {formattedDate}</p>
      </div>
      <div>
        <p>Últimos lancçamentos</p>
        {latestsComic.map((comic) => (
          <div key={comic.id}>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <p>{comic.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroPage;
