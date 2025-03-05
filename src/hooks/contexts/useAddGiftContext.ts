import { useContext } from "react";
import { AddGiftContext, AddGiftContextType } from "../../contexts/AddGiftContext";

export const useAddGiftContext = (): AddGiftContextType => {
  const context = useContext(AddGiftContext);
  if (!context) {
    throw new Error("useAddGiftContext must be used within a AddGiftProvider");
  }
  return context;
};
