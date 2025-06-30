import type { Comic } from "../models/Comic";
import type { Heroes } from "../models/Heroes";
import { marvelAPI } from "./api";

export const getCharacters = async (): Promise<Heroes[]> => {
  try {
    const response = await marvelAPI.get("/characters", {
      params: { limit: 20 },
    });
    return response.data.data.results;
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    return [];
  }
};
export const getCharacterById = async (
  id: number | any
): Promise<Heroes | null> => {
  try {
    const response = await marvelAPI.get(`/characters/${id}`);
    return response.data.data.results[0];
  } catch (error) {
    console.error("Erro ao buscar personagem por ID:", error);
    return null;
  }
};

export const getLatestComicByCharacterId = async (
  id: number | any
): Promise<Comic[]> => {
  try {
    const response = await marvelAPI.get(`/characters/${id}/comics`, {
      params: {
        orderBy: "-onsaleDate",
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error("Erro ao buscar quadrinho do héroi:", error);
    return [];
  }
};
