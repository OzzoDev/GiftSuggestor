import { ReactNode, useEffect, useState } from "react";

interface ToggleIconBtnProps {
  selected: boolean;
  disabled?: boolean;
  defualtIcon: ReactNode;
  selectedIcon: ReactNode;
  onClick: () => void | boolean;
}

export default function ToggleIconBtn({
  selected,
  disabled,
  defualtIcon,
  selectedIcon,
  onClick,
}: ToggleIconBtnProps) {
  const [isSelecetd, setIsSelected] = useState<boolean>(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const handleClick = () => {
    onClick();
    if (isSelecetd) {
      setIsSelected(false);
    } else if (!isSelecetd && !disabled) {
      setIsSelected(true);
    }
  };

  return (
    <button type="button" onClick={handleClick} className="border-0 outline-none cursor-pointer">
      {isSelecetd ? selectedIcon : defualtIcon}
    </button>
  );
}
