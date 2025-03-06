import { Gift } from "../../../types/types";
import AddReviewForm from "./addReview/AddReviewForm";
import GiftDetailsReview from "./GiftDetailsReview";

interface GiftDetialsReviewsProps {
  gift: Gift;
}

export default function GiftDetailsReviews({ gift }: GiftDetialsReviewsProps) {
  const reviews = gift.reviews;

  return (
    <div className="flex flex-col justify-center items-center gap-y-32">
      <AddReviewForm gift={gift} />
      <ul className="flex flex-col m-auto gap-y-16">
        {reviews.map((review, index) => {
          return <GiftDetailsReview key={review.review + index} review={review} />;
        })}
      </ul>
    </div>
  );
}
