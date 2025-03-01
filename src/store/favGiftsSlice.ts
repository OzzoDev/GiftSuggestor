import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GiftId } from "../types/types";
import axios from "axios";
import { API_ENDPOINTS } from "../api/api";

interface FavGiftsState {
  favGiftIds: GiftId[];
  numFavGifts: number;
  loading: boolean;
  error: string | null;
}

const initialState: FavGiftsState = {
  favGiftIds: [],
  numFavGifts: 0,
  loading: false,
  error: null,
};

export const fetchFavGiftsIds = createAsyncThunk<GiftId[], void>(
  "favGiftIds/fetchFavGiftsIds",
  async () => {
    const response = await axios.get<GiftId[]>(API_ENDPOINTS["FAVORITES"]);
    return response.data;
  }
);

const favGiftsSlice = createSlice({
  name: "favGifts",
  initialState,
  reducers: {
    addFavGiftId: (state, action: PayloadAction<GiftId>) => {
      state.favGiftIds.push(action.payload);
      state.numFavGifts = state.favGiftIds.length;
    },
    removeFavGiftId: (state, action: PayloadAction<GiftId>) => {
      state.favGiftIds = state.favGiftIds.filter((fav) => fav.id !== action.payload.id);
      state.numFavGifts = state.favGiftIds.length;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavGiftsIds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavGiftsIds.fulfilled, (state, action: PayloadAction<GiftId[]>) => {
        state.loading = false;
        state.error = null;
        state.favGiftIds = action.payload;
        state.numFavGifts = action.payload.length;
      })
      .addCase(fetchFavGiftsIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export const { addFavGiftId, removeFavGiftId } = favGiftsSlice.actions;
export default favGiftsSlice.reducer;
