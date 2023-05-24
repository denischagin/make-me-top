export interface RatingInterface {
  reflect?: boolean;
  rating?: number | null;
  starColor: ratingStarColor;
  size: ratingSize;
  scoreColor: ratingScoreColor;
}

export enum ratingStarColor {
  primary500 = "primary-500",
  white = "white",
}

export enum ratingSize {
  small = "small",
  large = "large",
  medium = "medium",
}

export enum ratingScoreColor {
  black = "black",
  white = "white",
}
