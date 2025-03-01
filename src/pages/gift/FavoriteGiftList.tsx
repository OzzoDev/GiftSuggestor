import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteGifts } from "../../api/api";
import { Gift } from "../../types/types";
import useFavGiftsStore from "../../hooks/useFavGiftsStore";
import { PuffLoader } from "react-spinners";
import GiftCard from "../../components/gift/GiftCard";

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
      <ul className="grid grid-cols-[1fr] md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)] xl:grid-cols-[repeat(4,1fr)] gap-8 p-8">
        {favoriteGifts.map((gift) => {
          return <GiftCard key={gift.id} gift={gift} isFavorite={true} />;
        })}
      </ul>
    </div>
  );
}
