export interface Review {
  author: string;
  content: string;
  date: string;
  found_helpful: string;
  images: string;
  product: string;
  rating: number;
  title: string;
  url: string;
  variant: string;
  verified_purchase: boolean;
}

export interface ScrapeResponse {
  average_rating: number;
  histogram: Record<string, number>;
  next_page: string;
  number_of_reviews: number;
  product_title: string;
  reviews: Review[];
}