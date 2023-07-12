export interface ExplorerState {
    isExplorer: boolean;
    explorerInfo: ExplorerInfoInterface
}

export interface ExplorerInfoInterface {
    person: Person;
    rating?: null;
    totalSystems: number;
    currentSystem: CurrentSystem;
    investigatedSystems?: Array<InvestigatedSystemsEntity> | null;
    ratingTable?: Array<null> | null;
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

export interface InvestigatedSystemsEntity {
    courseId: number;
    title: string;
    value: number;
    keeperId: number;
}