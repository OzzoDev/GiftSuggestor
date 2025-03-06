interface GiftCardRatingProps {
  rating: number;
}

export default function GiftRating({ rating }: GiftCardRatingProps) {
  return (
    <ul className="flex gap-x-2">
      {Array.from({ length: rating }, (_, index) => {
        return <li key={index}>⭐</li>;
      })}
    </ul>
  );
}
