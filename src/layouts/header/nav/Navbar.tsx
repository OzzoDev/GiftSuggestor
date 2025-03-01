import useFavGiftsStore from "../../../hooks/useFavGiftsStore";
import LinkNav from "./LinkNav";

export default function Navbar() {
  const { numFavGifts } = useFavGiftsStore();

  return (
    <nav className="fixed top-0 w-screen pb-4 pt-6 bg-slate-800 z-100">
      <div className="mx-8 flex gap-x-12">
        <LinkNav path="/" text="Gifts" />
        <div className="relative">
          <LinkNav path="favorites" text="Favorite gifts" />
          <span className="absolute top-[-6px] right-[-20px] text-sm text-white rounded-full">
            {numFavGifts}
          </span>
        </div>
      </div>
    </nav>
  );
}
