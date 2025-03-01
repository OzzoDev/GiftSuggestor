import { GiftListProvider } from "../../contexts/GiftListContext";
import FavoriteGiftList from "./FavoriteGiftList";

export default function FavoriteGiftsPage() {
  return (
    <GiftListProvider>
      <FavoriteGiftList />
    </GiftListProvider>
  );
}
