import { useQuery } from "@tanstack/react-query";
import { Gift, GiftId } from "../../types/types";
import { fetchFavoriteGiftIds, fetchGifts } from "../../api/api";
import { PuffLoader } from "react-spinners";
import GiftCard from "./GiftCard";

export default function GiftList() {
  const {
    data: gifts,
    error,
    isLoading,
  } = useQuery<Gift[]>({ queryKey: ["gifts"], queryFn: fetchGifts });

  const { data: favoriteGiftIds } = useQuery<GiftId[]>({
    queryKey: ["favoriteGiftIds"],
    queryFn: fetchFavoriteGiftIds,
  });

  if (isLoading) {
    return (
      <PuffLoader
        size={80}
        className="absoulte top-[50vh] left-[50vw] transform -translate-x-1/2 -translate-y-1/2"
      />
    );
  }

  if (error instanceof Error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <div>
      <ul className="grid grid-cols-[1fr] md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)] gap-8 p-8">
        {gifts?.map((gift) => {
          const isFavoriteGift = favoriteGiftIds?.some((favId) => favId.id === gift.id);
          return <GiftCard key={gift.id} gift={gift} isFavorite={!!isFavoriteGift} />;
        })}
      </ul>
    </div>
  );
}
