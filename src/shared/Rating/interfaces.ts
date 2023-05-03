import { RatingSize, RatingStarColor, RatingScoreColor } from "@shared/types/enums";

export interface RatingInterface {
  reflect?: boolean
  rating?: number | null
  starColor: RatingStarColor
  size: RatingSize
  scoreColor: RatingScoreColor
}