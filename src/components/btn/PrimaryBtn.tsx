import { ReactNode } from "react";

interface PrimaryBtnProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: ReactNode;
}

export default function PrimaryBtn({ type = "button", onClick, children }: PrimaryBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-2 font-medium w-full rounded-full text-white bg-gradient-to-r from-cyan-500 to-cyan-300 transition-opacity duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap">
      {children}
    </button>
  );
}
