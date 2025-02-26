interface PrimaryBtnProps {
  btnText: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function PrimaryBtn({ btnText, type = "button", onClick }: PrimaryBtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="px-4 font-medium w-full rounded-full text-white bg-gradient-to-r from-cyan-500 to-cyan-300 transition-opacity duration-300 hover:opacity-70 cursor-pointer">
      {btnText}
    </button>
  );
}
