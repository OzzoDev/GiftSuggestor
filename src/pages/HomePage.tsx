import { useRef } from "react";
import GiftList, { GiftListRef } from "../components/gift/GiftList";
import { GiftFilters } from "../types/types";
import GiftPriceFilter from "../components/gift/GiftPriceFilter";
import Searchbar from "../components/common/SearchBar";
import { GiftListProvider } from "../contexts/GiftListContext";

export default function HomePage() {
  const giftListRef = useRef<GiftListRef>(null);

  const handleSearchGifts = (query: string): void => {
    if (giftListRef.current) {
      giftListRef.current.setFilters((prev: GiftFilters | undefined) => ({
        searchQuery: query,
        minPrice: prev?.minPrice,
      }));
    }
  };

  const handleSelectPriceMinPrice = (minPrice: number): void => {
    if (giftListRef.current) {
      giftListRef.current.setFilters((prev: GiftFilters | undefined) => ({
        searchQuery: prev?.searchQuery,
        minPrice,
      }));
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-y-6 py-12 bg-slate-700">
        <div className="w-full max-w-[700px]">
          <Searchbar placeholder="Search gifts" onChange={handleSearchGifts} />
        </div>
        <GiftPriceFilter onClick={handleSelectPriceMinPrice} />
      </div>
      <GiftListProvider>
        <GiftList ref={giftListRef} />
      </GiftListProvider>
    </div>
  );
}
