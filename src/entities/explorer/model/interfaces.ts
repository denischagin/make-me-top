export interface ExplorerState {
    isExplorer: boolean;
    applicationCard: ApplicationCardInterface
}

export interface ApplicationCardInterface {
    planet: string,
    star: string,
}
