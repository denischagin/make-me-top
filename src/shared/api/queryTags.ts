export const queryTags = {
    getExplorerProfile: 'getExplorerProfile',
    getExplorerCardInfo: 'getExplorerCardInfo',
    getAllExplorers: 'getAllExplorers',

    getAllKeepers: 'getAllKeepers',
    getKeeperCardInfo: 'getKeeperCardInfo',
    getKeeperProfile: 'getKeeperProfile',

    getAllGalaxies: 'getAllGalaxies',
    getExplorerProgressByExplorerId: 'getExplorerProgressByExporerId',
    getPlanetsBySystemId: 'getPlanetsBySystemId',
    getCourseInfoByCourseId: 'getCourseInfoByCourseId',
    getSystemsBySystemId: 'getSystemsBySystemId',
    getExplorerCourseProgress: 'getExplorerCourseProgress',
    getKeeperCurrentGroup: 'getKeeperCurrentGroup',

    getAllThemes: 'getAllThemes',
    getThemeById: 'getThemeById',

    getHomeworks: 'getHomeworks',
    getHomeworkRequestsByHomeworkId: 'getHomeworkRequestsByHomeworkId',
    getHomeworkRequestsByRequestId: 'getHomeworkRequestsByRequestId',

    getExplorersWaitingThemeMark: 'getExplorersWaitingThemeMark',
    getThemesWaitingExplorersMark: 'getThemesWaitingExplorersMark',
} as const;
