import { StudyingExplorersInterface } from '@entities/keeper/model/types/interfaces';

export interface ExplorerItemListInterface {
    explorers: Array<StudyingExplorersInterface> | null | undefined;
}
