import { GiftReview } from "../types/types";

export function joinWithAnd(arr: string[]): string {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr.join(" and ");
  return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
}

export function calcGiftAverageRating(giftReviews: GiftReview[]): number {
  const averageRating = Math.round(
    giftReviews.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) / giftReviews.length
  );
  return averageRating;
}

export function giftPriceBadgeBg(price: number): string {
  return price > 100
    ? "rgba(91, 11, 230,0.9)"
    : price > 60
    ? "rgba(27, 98, 250,0.9)"
    : price > 30
    ? "rgba(27, 183, 250,0.9)"
    : "rgba(4, 189, 109, 0.9)";
}
