import { useRef } from "react";
import Searchbar from "../components/common/Searchbar";
import GiftList, { GiftListRef } from "../components/gift/GiftList";

export default function HomePage() {
  const giftListRef = useRef<GiftListRef>(null);

  return (
    <div className="min-h-screen">
      <div className="mx-2 max-w-[500px]">
        <Searchbar
          placeholder="Search gifts"
          onChange={(query) => giftListRef.current?.setSearchQuery(query)}
        />
      </div>
      <GiftList ref={giftListRef} />
    </div>
  );
}
