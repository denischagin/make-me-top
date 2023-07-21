export interface ExplorerState {
    isExplorer: boolean;
    explorerApplicationCard: ExplorerApplicationCardInterface
    explorerInfo: ExplorerInfoInterface
}

export interface ExplorerApplicationCardInterface {
    star: string
    planet: string
}

export interface ExplorerInfoInterface {
    person: Person;
    rating?: number | null;
    totalSystems: number;
    currentSystem: CurrentSystem;
    investigatedSystems: Array<InvestigatedSystemsInterface>;
    ratingTable: Array<null>;
}

export interface Person {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    registrationDate: string;
}

export interface CurrentSystem {
    courseThemeId: number;
    courseThemeTitle: string;
    courseId: number;
    courseTitle: string;
    keeper: Keeper;
    progress: number;
}

export interface Keeper {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    keeperId: number;
}

export interface InvestigatedSystemsInterface {
    courseId: number;
    title: string;
    rating: number | null;
    keeperId: number;
}