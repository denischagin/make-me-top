import { StudyingExplorersInterface } from '@entities/curator/model/types/interfaces';

export interface ExplorerCardListInterface {
    explorers: Array<StudyingExplorersInterface> | null | undefined;
}
