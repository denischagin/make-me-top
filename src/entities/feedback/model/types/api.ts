export interface CreateExplorerFeedbackParamsInterface {
    explorerId: number,
    rating: number,
    comment: string
}

export interface CreateCourseRatingParamsInterface {
    explorerId: number,
    rating: number
}

export interface CreateKeeperFeedbackParamsInterface {
    explorerId: number;
    rating: number;
    comment: string;
}
