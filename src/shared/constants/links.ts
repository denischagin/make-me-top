// urls
export const URL_PROFILE = '/profile';
export const URL_DEFAULT = '/';
export const URL_KEEPER = '/keeper';
export const URL_EXPLORER = '/explorer';
export const URL_GALAXY = '/galaxy';

export const URL_KEEPERS = '/keepers';
export const URL_EXPLORERS = '/explorers';
export const URL_NOT_FOUND = '*';

export const URL_KEEPER_CARD = '/keeper/:keeperId';
export const URL_EXPLORER_CARD = '/explorer/:explorerId';
export const URL_GALAXY_CARD = '/galaxy/:galaxyId';

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
        link: URL_DEFAULT,
        text: 'Выйти',
    },
];
