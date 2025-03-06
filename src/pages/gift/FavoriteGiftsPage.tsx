import { GiftListProvider } from "../../contexts/GiftListContext";
import FavoriteGiftList from "../../components/gift/FavoriteGiftList";

export default function FavoriteGiftsPage() {
  return (
    <GiftListProvider>
      <FavoriteGiftList />
    </GiftListProvider>
  );
}
