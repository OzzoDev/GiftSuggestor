import axios from "axios";
import { Gift } from "../types/types";
const API_URL: string = "http://localhost:5001";

const ENDPOINTS: Record<string, string> = {
  GIFTS: `${API_URL}/gifts`,
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
