import { GiftReview } from "../../../types/types";
import GiftRating from "../GiftRating";

interface GiftDetailsReviewProps {
  review: GiftReview;
}

export default function GiftDetailsReview({ review }: GiftDetailsReviewProps) {
  return (
    <div className="flex flex gap-x-6">
      <p className="text-xl font-medium text-gray-500">{review.review}</p>
      <GiftRating rating={review.rating} />
    </div>
  );
}
