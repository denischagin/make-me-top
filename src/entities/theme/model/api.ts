import { ExplorerWaitingMark, ThemeInterface } from './interfaces';

export type GetThemeByThemeIdResponse = ThemeInterface
export type GetExplorersWaitingThemeMarkResponse = ExplorerWaitingMark[]
export type GetThemesWaitingExplorersMark = number[]
export type GetExplorerThemesMarksResponse = Record<string, number>
