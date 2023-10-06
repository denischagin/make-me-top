// urls
export const URL_LOGIN = '/login';
export const URL_LOGIN_AS_EXPLORER = '/login/explorer';
export const URL_LOGIN_AS_KEEPER = '/login/keeper';

export const URL_PROFILE = '/profile';
export const URL_DEFAULT = '/';
export const URL_KEEPER = '/keeper';
export const URL_EXPLORER = '/explorer';
export const URL_GALAXY = '/galaxies';

export const URL_KEEPERS = '/keepers';
export const URL_EXPLORERS = '/explorers';
export const URL_NOT_FOUND = '*';

export const URL_KEEPER_CARD = '/person/:personId/keeper/';
export const URL_EXPLORER_CARD = '/person/:personId/explorer/';
export const URL_GALAXY_CARD = '/galaxies/:galaxyId';

// header links
export const HEADER_LINKS = [
    {
        link: URL_PROFILE,
        text: 'Главная',
    },
    {
        link: URL_EXPLORERS,
        text: 'Исследователи',
    },
    {
        link: URL_KEEPERS,
        text: 'Хранители',
    },
    {
        link: URL_LOGIN,
        text: 'Выйти',
    },
];
