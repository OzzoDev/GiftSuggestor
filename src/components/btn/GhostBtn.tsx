interface GhostBtnProps {
  btnText: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function GhostBtn({ btnText, type = "button", onClick }: GhostBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 py-2 font-medium w-full rounded-full bg-slate-200 transition-opacity duration-300 hover:opacity-70 cursor-pointer">
      {btnText}
    </button>
  );
}
