import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Gift, GiftFilters, GiftId } from "../../types/types";
import { fetchFavoriteGiftIds, fetchGifts } from "../../api/api";
import { PuffLoader } from "react-spinners";
import GiftCard from "./GiftCard";
import { calcGiftAverageRating } from "../../utils/helpers";

export interface GiftListRef {
  setFilters: (filters: GiftFilters | ((prev: GiftFilters | undefined) => GiftFilters)) => void;
}

const GiftList = forwardRef<GiftListRef, {}>(function GiftList(_, ref) {
  const {
    data: gifts,
    error,
    isLoading,
  } = useQuery<Gift[]>({ queryKey: ["gifts"], queryFn: fetchGifts });

  const { data: favoriteGiftIds } = useQuery<GiftId[]>({
    queryKey: ["favoriteGiftIds"],
    queryFn: fetchFavoriteGiftIds,
  });

  const [filters, setFilters] = useState<GiftFilters>();

  useImperativeHandle(ref, () => ({
    setFilters: (
      filtersOrUpdater: GiftFilters | ((prev: GiftFilters | undefined) => GiftFilters)
    ) => {
      setFilters((prev) => {
        return typeof filtersOrUpdater === "function" ? filtersOrUpdater(prev) : filtersOrUpdater;
      });
    },
  }));

  const filteredGifts = useMemo(() => {
    return gifts
      ?.filter((gift) => gift.gift.toLowerCase().includes(filters?.searchQuery || "".toLowerCase()))
      .filter((gift) => (filters?.minPrice ? gift.price.min >= filters.minPrice : true))
      .sort((a, b) => calcGiftAverageRating(b.reviews) - calcGiftAverageRating(a.reviews));
  }, [gifts, filters]);

  if (isLoading) {
    return (
      <PuffLoader
        size={80}
        className="absolute top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2"
      />
    );
  }

  if (error) {
    return <h1 className="p-6 text-2xl text-red-500 text-center">{error.message}</h1>;
  }

  return (
    <div>
      <ul className="grid grid-cols-[1fr] md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)] gap-8 p-8">
        {filteredGifts?.map((gift) => {
          const isFavoriteGift = favoriteGiftIds?.some((favId) => favId.id === gift.id);
          return <GiftCard key={gift.id} gift={gift} isFavorite={!!isFavoriteGift} />;
        })}
      </ul>
    </div>
  );
});

export default GiftList;
