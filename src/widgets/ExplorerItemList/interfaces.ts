import { StudyingExplorersInterface } from '@entities/curator/model/types/interfaces';

export interface ExplorerItemListInterface {
    explorers: Array<StudyingExplorersInterface> | null | undefined;
}
