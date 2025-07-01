// features/home/useHome.ts
import { useEffect, useState } from "react";
import type { Heroes } from "../../models/Heroes";
import { getCharacters, getCharactersByPrefix } from "../../services/marvel";
import { useFavoritesStore } from "../../store/useFavoriteStore";

export const useHome = () => {
  const [data, setData] = useState<Heroes[]>([]);
  const [sortOrder, setSortOrder] = useState<boolean>(true);
  const [searchHero, setSearchHero] = useState<string>("");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const { favorites } = useFavoritesStore();

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    setLoading(true);
    try {
      const heroes = await getCharacters();
      setData(heroes);
    } finally {
      setLoading(false);
    }
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

  const handleSearchHero = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSortOrder(true);

      if (!searchHero.trim()) {
        loadHeroes();
        return;
      }

      setLoading(true);
      try {
        const response = await getCharactersByPrefix(searchHero);
        setData(response);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleShowFavorites = () => {
    setShowOnlyFavorites((prev) => !prev);
  };

  const filteredData = showOnlyFavorites ? favorites : data;

  return {
    data: filteredData,
    toggleSortOrder,
    sortOrder,
    searchHero,
    setSearchHero,
    handleSearchHero,
    showOnlyFavorites,
    handleShowFavorites,
    loading,
  };
};
