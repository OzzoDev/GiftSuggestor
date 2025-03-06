import { HiOutlineExclamationCircle } from "react-icons/hi";

const MAX_RATING = 5;

interface GiftRatingProps {
  rating: number;
  errorMessage?: string;
  setRating: (rating: number) => void;
}

export default function GiftRating({ rating, errorMessage, setRating }: GiftRatingProps) {
  return (
    <div className="flex flex-col items-start">
      <div
        className={`flex justify-between gap-x-4 mb-4 ${
          errorMessage ? "opacity-100" : "opacity-0"
        }`}>
        <p className="text text-red-500 font-bold">{errorMessage}</p>
        <HiOutlineExclamationCircle size={24} color="red" />
      </div>
      <ul
        className={`flex gap-x-2 p-4 border-2 rounded-md ${
          errorMessage ? "border-red-500" : "border-transparent"
        }`}>
        {Array.from({ length: MAX_RATING }, (_, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              className={`cursor-pointer ${
                index >= rating || !rating ? "hue-rotate-180 brightness-75" : ""
              }`}>
              ⭐
            </button>
          );
        })}
      </ul>
    </div>
  );
}
