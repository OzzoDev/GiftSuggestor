import { ReactNode } from "react";

interface GhostBtnProps {
  type?: "button" | "submit";
  onClick?: () => void;
  children: ReactNode;
}

export default function GhostBtn({ type = "button", onClick, children }: GhostBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-2 font-medium w-full rounded-full bg-slate-200 transition-opacity duration-300 hover:opacity-70 cursor-pointer whitespace-nowrap">
      {children}
    </button>
  );
}
