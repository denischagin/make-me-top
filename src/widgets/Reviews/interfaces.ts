import { ExplorerCardInfoInterface } from '@entities/explorer/model/types/interfaces';
import { KeeperCardInfoInterface } from '@entities/keeper/model/types/interfaces';
import { ReviewCardInterface } from '@shared/types/common';

export interface ReviewsInterface {
    reviews: Array<ReviewCardInterface>;
}

export interface ReviewsProps {
    reviews: ExplorerCardInfoInterface | KeeperCardInfoInterface
}