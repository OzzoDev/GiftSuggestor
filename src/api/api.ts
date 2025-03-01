import axios from "axios";
import { Gift, GiftFavoriteToggleMessage, GiftId } from "../types/types";
export const API_URL: string = "http://localhost:5000";

export const API_ENDPOINTS: Record<string, string> = {
  GIFTS: `${API_URL}/gifts`,
  FAVORITES: `${API_URL}/favorites`,
};

export const fetchGifts = async (): Promise<Gift[]> => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  try {
    const response = await axios.get<Gift[]>(API_ENDPOINTS["GIFTS"]);
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
    const response = await axios.get<GiftId[]>(API_ENDPOINTS["FAVORITES"]);
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
    const favoriteGiftsResponse = await axios.get<GiftId[]>(API_ENDPOINTS["FAVORITES"]);
    const favoriteGifts = favoriteGiftsResponse.data;

    const isInFavorites = favoriteGifts.find((fav) => fav.id === gift.id);

    if (!isInFavorites) {
      if (favoriteGifts.length >= 10) {
        throw new Error("Max reached");
      }
      await axios.post(API_ENDPOINTS["FAVORITES"], { id: gift.id });
      return "Added";
    } else {
      await axios.delete(`${API_ENDPOINTS["FAVORITES"]}/${gift.id}`);
      return "Removed";
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred while toggling favorite.");
    } else if (error instanceof Error && error.message === "Max reached") {
      throw new Error(
        "You can only have up to 10 favorite gifts. Please remove one to add a new favorite."
      );
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
