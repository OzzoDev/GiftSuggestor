import { useContext } from "react";
import { GiftListContext, GiftListContextType } from "../contexts/GiftListContext";

export const useGiftListContext = (): GiftListContextType => {
  const context = useContext(GiftListContext);
  if (!context) {
    throw new Error("useGiftListContext must be used within a GiftListProvider");
  }
  return context;
};
