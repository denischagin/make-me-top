// urls
export const URL_LOGIN = '/login';
export const URL_LOGIN_AS_EXPLORER = '/login/explorer';
export const URL_LOGIN_AS_KEEPER = '/login/keeper';

export const URL_PROFILE = '/profile';
export const URL_DEFAULT = '/';
export const URL_KEEPER = '/keeper';
export const URL_EXPLORER = '/explorer';
export const URL_GALAXY = '/galaxies';

export const getUrlExplorerById = (personId: string) =>
	`/person/${personId}${URL_EXPLORER}/`;
export const getUrlKeeperById = (personId: string) =>
	`/person/${personId}${URL_KEEPER}/`;

export const URL_KEEPERS = '/keepers';
export const URL_EXPLORERS = '/explorers';
export const URL_NOT_FOUND = '*';

export const URL_KEEPER_CARD = '/person/:personId/keeper/';
export const URL_EXPLORER_CARD = '/person/:personId/explorer/';

export const URL_GALAXY_CARD = '/galaxies/:galaxyId';

export const URL_THEME_CARD_LAYOUT = '/courses/:courseId';
export const URL_THEME_CARD = '/courses/:courseId/themes/:themeId';
export const URL_HOMEWORK_REQUEST_EXPLORER_CARD = '/homeworks/:homeworkId';
export const URL_HOMEWORK_REQUEST_KEEPER_CARD = '/homeworks/:homeworkId/homework-requests/:requestId';

export const getUrlThemeByCourseId = (args: { courseId: string | number }) =>
	`/courses/${args.courseId}`;

export const getUrlThemeByCourseIdAndThemeId =
	(args: {
		themeId: string | number, courseId: string | number
	}) =>
		`/courses/${args.courseId}/themes/${args.themeId}`;

export const getUrlHomework =
	(args: {
		homeworkId: string | number,
	}) =>
		`/homeworks/${args.homeworkId}`;

export const getUrlHomeworkWithRequestId =
	(args: {
		homeworkId: string | number, requestId: string | number,
	}) =>
		`/homeworks/${args.homeworkId}/homework-requests/${args.requestId}`;

export interface HeaderLinkInterface {
	link: string;
	text: string;
	isSignOutButton?: boolean;
}

// header links
export const HEADER_LINKS: HeaderLinkInterface[] = [
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
		isSignOutButton: true
	},
];
export const HEADER_LINK_GUEST: HeaderLinkInterface[] = [
	{
		link: URL_LOGIN,
		text: 'Войти'
	},
	{
		link: URL_GALAXY,
		text: 'Все галактики',
	},
];
