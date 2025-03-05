import React, { createContext, ReactNode, useState } from "react";

interface AddGiftState {
  images: string[];
}

export interface AddGiftContextType {
  state: AddGiftState;
  setState: React.Dispatch<React.SetStateAction<AddGiftState>>;
}

export const AddGiftContext = createContext<AddGiftContextType | undefined>(undefined);

export const AddGiftProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AddGiftState>({
    images: [],
  });

  return <AddGiftContext.Provider value={{ state, setState }}>{children}</AddGiftContext.Provider>;
};
