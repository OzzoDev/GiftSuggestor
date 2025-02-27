import { useState } from "react";
import GiftCardPriceBadge from "./GiftCardPriceBadge";
import { giftPriceBadgeBg } from "../../utils/helpers";

const GIFT_MIN_PRICES = [0, 30, 60, 90, 130];

interface GiftPriceFilterProps {
  onClick: (minPrice: number) => void;
}

export default function GiftPriceFilter({ onClick }: GiftPriceFilterProps) {
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(GIFT_MIN_PRICES[0]);

  const handleSelectMinPrice = (index: number): void => {
    const minPrice = GIFT_MIN_PRICES[index];
    setSelectedMinPrice(minPrice);
    onClick(minPrice);
  };

  return (
    <div className="flex flex-col items-center gap-y-2">
      <p className="my-4 text-gray-200">Filter by minimum price</p>
      <ul className="flex items-start gap-x-4">
        {GIFT_MIN_PRICES.map((price, index) => {
          const backgroundColor = giftPriceBadgeBg(price);
          return (
            <button
              key={price + index}
              onClick={() => handleSelectMinPrice(index)}
              className={`pb-2 cursor-pointer ${
                selectedMinPrice === price ? "opacity-60 border-b-[1px] border-white" : ""
              }`}>
              <GiftCardPriceBadge text={`$${price}`} backgroundColor={backgroundColor} />
            </button>
          );
        })}
      </ul>
    </div>
  );
}
