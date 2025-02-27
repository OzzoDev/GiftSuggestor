import React, { createContext, ReactNode, useState } from "react";

interface GiftListState {
  favGiftToggleMessage: string;
}

export interface GiftListContextType {
  state: GiftListState;
  setState: React.Dispatch<React.SetStateAction<GiftListState>>;
}

export const GiftListContext = createContext<GiftListContextType | undefined>(undefined);

export const GiftListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GiftListState>({
    favGiftToggleMessage: "",
  });

  return (
    <GiftListContext.Provider value={{ state, setState }}>{children}</GiftListContext.Provider>
  );
};
