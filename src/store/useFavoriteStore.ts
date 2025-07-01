import { create } from "zustand";
import type { Heroes } from "../models/Heroes";

interface FavoritesStore {
  favorites: Heroes[];
  toggleFavorite: (hero: Heroes) => void;
  isFavorited: (heroId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => {
  const stored = localStorage.getItem("favoriteHeroes");
  const initialFavorites: Heroes[] = stored ? JSON.parse(stored) : [];

  return {
    favorites: initialFavorites,

    toggleFavorite: (hero) => {
      const { favorites } = get();
      const isAlreadyFavorited = favorites.some(
        (favoriteHero) => favoriteHero.id === hero.id
      );

      let updatedFavorites: Heroes[];

      if (isAlreadyFavorited) {
        updatedFavorites = favorites.filter(
          (favoriteHero) => favoriteHero.id !== hero.id
        );
      } else {
        if (favorites.length >= 5) {
          alert("Você só pode favoritar até 5 heróis.");
          return;
        }
        updatedFavorites = [...favorites, hero];
      }

      localStorage.setItem("favoriteHeroes", JSON.stringify(updatedFavorites));
      set({ favorites: updatedFavorites });
    },

    isFavorited: (heroId) => {
      return get().favorites.some((favoriteHero) => favoriteHero.id === heroId);
    },
  };
});
