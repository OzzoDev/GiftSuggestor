import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useCallback } from "react";
import { GiftId } from "../types/types";
import { addFavGiftId, removeFavGiftId } from "../store/favGiftsSlice";

const useFavGiftsStore = () => {
  const dispatch = useDispatch();
  const favGiftsState = useSelector((state: RootState) => state.favGifts);

  const appendFavGiftId = useCallback(
    (favGiftID: GiftId) => {
      dispatch(addFavGiftId(favGiftID));
    },
    [dispatch]
  );

  const deleteFavGiftId = useCallback(
    (favGiftId: GiftId) => {
      dispatch(removeFavGiftId(favGiftId));
    },
    [dispatch]
  );

  return {
    ...favGiftsState,
    appendFavGiftId,
    deleteFavGiftId,
  };
};

export default useFavGiftsStore;
