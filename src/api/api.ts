import axios from "axios";
import { Gift, GiftFavoriteToggleMessage, GiftId } from "../types/types";
const API_URL: string = "http://localhost:5000";

const ENDPOINTS: Record<string, string> = {
  GIFTS: `${API_URL}/gifts`,
  FAVORITES: `${API_URL}/favorites`,
};

export const fetchGifts = async (): Promise<Gift[]> => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  try {
    const response = await axios.get<Gift[]>(ENDPOINTS["GIFTS"]);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred while fetching gifts.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const fetchFavoriteGiftIds = async (): Promise<GiftId[]> => {
  try {
    const response = await axios.get<GiftId[]>(ENDPOINTS["FAVORITES"]);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An error occurred while fetching favorite gift ids."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const toggleGiftInFavorites = async (gift: Gift): Promise<GiftFavoriteToggleMessage> => {
  try {
    const favoriteGiftsResponse = await axios.get<Gift[]>(ENDPOINTS["FAVORITES"]);
    const favoriteGifts = favoriteGiftsResponse.data;

    const isInFavorites = favoriteGifts.find((fav) => fav.id === gift.id);

    if (!isInFavorites) {
      await axios.post(ENDPOINTS["FAVORITES"], { id: gift.id });
      return "Added";
    } else {
      await axios.delete(`${ENDPOINTS["FAVORITES"]}/${gift.id}`);
      return "Removed";
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred while toggling favorite.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
