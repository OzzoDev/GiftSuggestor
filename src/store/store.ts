import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favGiftsReducer from "./favGiftsSlice";
import fetchFavGiftIdsMiddleware from "./fetchFavGiftIdsMiddleware";

const rootReducer = combineReducers({ favGifts: favGiftsReducer });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchFavGiftIdsMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
