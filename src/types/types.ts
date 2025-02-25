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
