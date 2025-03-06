import { Gift } from "../../../types/types";
import { calcGiftAverageRating, giftPriceBadgeBg, joinWithAnd } from "../../../utils/helpers";
import GiftPriceBadge from "../GiftPriceBadge";
import GiftRating from "../GiftRating";

interface GiftDetailsProps {
  gift: Gift;
}

export default function GiftDetails({ gift }: GiftDetailsProps) {
  const minPrice = gift.price.min;
  const priceBadgeBackgroundColor = giftPriceBadgeBg(minPrice || 0);

  const averageRating = calcGiftAverageRating(gift.reviews);

  return (
    <div className="flex flex-col items-center gap-y-8">
      <p className="text-3xl font-semibold text-gray-500 text-center">{gift.gift}</p>
      <p className="text-xl font-medium text-gray-400 text-center">{gift.description}</p>
      <p className="text-lg text-gray-400 text-center">{joinWithAnd(gift.occasion)}</p>
      <div className="flex items-center gap-x-4">
        <GiftPriceBadge
          text={`$${gift.price.min} - ${gift.price.max}`}
          backgroundColor={priceBadgeBackgroundColor}
        />
        {averageRating > 0 && <GiftRating rating={averageRating} />}
      </div>
    </div>
  );
}
