import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCharacterById,
  getLatestComicByCharacterId,
} from "../../services/marvel";
import type { Heroes } from "../../models/Heroes";
import type { Comic } from "../../models/Comic";

export function useHeroPage() {
  const { id } = useParams<{ id: string }>();

  const [hero, setHero] = useState<Heroes | null>(null);
  const [latestsComic, setLatestsComic] = useState<Comic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHero() {
      if (!id) return;

      setLoading(true);
      try {
        const character = await getCharacterById(Number(id));
        const comic = await getLatestComicByCharacterId(Number(id));

        setHero(character);
        setLatestsComic(comic);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHero();
  }, [id]);

  // Datas importantes formatadas podem ficar aqui também:
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

  return { hero, latestsComic, loading, formattedDate };
}
