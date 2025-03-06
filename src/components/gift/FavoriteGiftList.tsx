import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteGifts } from "../../api/api";
import { Gift } from "../../types/types";
import useFavGiftsStore from "../../hooks/useFavGiftsStore";
import { PuffLoader } from "react-spinners";
import GiftCard from "./GiftCard";

export default function FavoriteGiftList() {
  const { favGiftIds } = useFavGiftsStore();
  const {
    data: favoriteGifts,
    isLoading,
    error,
  } = useQuery<Gift[], Error>({
    queryKey: ["favoriteGifts", favGiftIds],
    queryFn: () => fetchFavoriteGifts(favGiftIds.map((fav) => fav.id)),
    enabled: favGiftIds.length > 0,
  });

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

  if (!favoriteGifts || favoriteGifts?.length === 0) {
    return <h1 className="p-6 text-2xl text-red-500 text-center">No favorite gifts</h1>;
  }

  return (
    <div>
      <ul className="flex flex-wrap gap-8 m-auto w-[94%] max-w-[1800px] pt-20">
        {favoriteGifts.map((gift) => {
          return <GiftCard key={gift.id} gift={gift} isFavorite={true} />;
        })}
      </ul>
    </div>
  );
}
