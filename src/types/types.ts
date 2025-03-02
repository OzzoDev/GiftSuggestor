export type Gift = {
  id: string;
  gift: string;
  description: string;
  price: GiftPrice;
  occasion: string[];
  url: string;
  images: string[];
  reviews: GiftReview[];
};

export type GiftPrice = {
  min: number;
  max: number;
};

export type GiftReview = {
  rating: number;
  review: string;
};

export type GiftFavoriteToggleMessage = "Added" | "Removed";

export type GiftId = {
  id: string;
};

export type GiftFilters = {
  searchQuery?: string;
  minPrice?: number;
};

export type BuildUnion<N extends number, Acc extends number[] = [1]> = Acc["length"] extends N
  ? Acc[number]
  : BuildUnion<N, [...Acc, Acc["length"] extends 0 ? 1 : Acc["length"]]>;
