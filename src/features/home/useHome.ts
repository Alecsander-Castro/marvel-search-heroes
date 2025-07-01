import { useEffect, useState } from "react";
import type { Heroes } from "../../models/Heroes";
import { getCharacters, getCharactersByPrefix } from "../../services/marvel";

export const useHome = () => {
  const [data, setData] = useState<Heroes[]>([]);
  const [favorites, setFavorites] = useState<Heroes[]>([]);
  const [sortOrder, setSortOrder] = useState<boolean>(true);
  const [searchHero, setSearchHero] = useState<string>("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("favoriteHeroes");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed) setFavorites(parsed);
      } catch (error) {
        console.error("Erro ao ler favoritos:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoriteHeroes", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    const heroes = await getCharacters();
    setData(heroes);
  };

  const toggleSortOrder = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder) {
        return b.name.localeCompare(a.name);
      } else {
        return a.name.localeCompare(b.name);
      }
    });
    setData(sortedData);
    setSortOrder(!sortOrder);
  };

  const toggleFavorite = (hero: Heroes) => {
    const alreadyFavorited = favorites.some((fav) => fav.id === hero.id);

    if (alreadyFavorited) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== hero.id));
    } else {
      if (favorites.length >= 5) {
        alert("Você só pode favoritar até 5 heróis.");
        return;
      }
      setFavorites((prev) => [...prev, hero]);
    }
  };

  const handleSearchHero = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSortOrder(true);
      if (!searchHero.trim()) {
        loadHeroes();
        setSortOrder(true);

        return;
      }

      const response = await getCharactersByPrefix(searchHero);
      setData(response);
    }
  };

  const handleShowFavorites = () => {
    setShowOnlyFavorites((prev) => !prev);
  };

  const filteredData = showOnlyFavorites ? favorites : data;

  return {
    data: filteredData,
    favorites,
    toggleFavorite,
    toggleSortOrder,
    sortOrder,
    searchHero,
    setSearchHero,
    handleSearchHero,
    showOnlyFavorites,
    handleShowFavorites,
  };
};
