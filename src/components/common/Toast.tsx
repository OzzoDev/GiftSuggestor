import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ToastProps {
  message: string;
  show?: boolean;
  visibilityDuration?: number;
  isError?: boolean;
  onClose?: () => void;
}

export default function Toast({
  message,
  show,
  visibilityDuration = 3,
  isError,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState<boolean>(!!show);
  const [progress, setProgress] = useState<number>(100);

  useEffect(() => {
    setIsVisible(!!show);
    setProgress(100);

    if (show) {
      const interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / (visibilityDuration * 10), 0));
      }, 100);

      const timeout = setTimeout(() => {
        onClose && onClose();
        clearInterval(interval);
      }, visibilityDuration * 1000);

      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
      };
    }
  }, [show, visibilityDuration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-2 left-2 flex flex-col gap-y-2 p-6 w-[90%] max-w-[300px] rounded-lg bg-slate-600 z-100">
      <button onClick={onClose} className="cursor-pointer">
        <IoMdClose size={24} color="red" />
      </button>
      <p className={`${isError ? "text-red-500" : "text-white"} font-medium`}>{message}</p>
      <div
        className="h-1 bg-green-700"
        style={{
          width: `${progress}%`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}
