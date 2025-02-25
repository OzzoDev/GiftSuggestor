import { ReactNode, useState } from "react";

interface ToggleIconBtnProps {
  onClick: () => void;
  selected: boolean;
  defualtIcon: ReactNode;
  selectedIcon: ReactNode;
}

export default function ToggleIconBtn({
  onClick,
  selected,
  defualtIcon,
  selectedIcon,
}: ToggleIconBtnProps) {
  const [isSelecetd, setIsSelected] = useState<boolean>(selected);

  const handleClick = () => {
    onClick();
    setIsSelected((prev) => !prev);
  };

  return (
    <button onClick={handleClick} className="border-0 outline-none cursor-pointer">
      {isSelecetd ? selectedIcon : defualtIcon}
    </button>
  );
}
