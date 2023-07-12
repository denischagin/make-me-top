import { StudyingExplorersEntity } from '@entities/curator/model/types/interfaces';

export interface ExplorerCardListInterface {
    explorers: Array<StudyingExplorersEntity> | null | undefined;
}
