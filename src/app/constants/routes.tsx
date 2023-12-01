import { lazy } from 'react';

import {
	URL_DEFAULT,
	URL_EXPLORER_CARD,
	URL_EXPLORERS,
	URL_GALAXY,
	URL_GALAXY_CARD, URL_HOMEWORK_REQUEST_EXPLORER_CARD, URL_HOMEWORK_REQUEST_KEEPER_CARD,
	URL_KEEPER_CARD,
	URL_KEEPERS,
	URL_LOGIN,
	URL_LOGIN_AS_EXPLORER,
	URL_LOGIN_AS_KEEPER,
	URL_NOT_FOUND,
	URL_PROFILE, URL_THEME_CARD, URL_THEME_CARD_LAYOUT,
} from '@shared/constants/links';

import { Navigate } from 'react-router-dom';

const LoginAsExplorer = lazy(() => import('@pages/LoginAsExplorer/page'));
const LoginAsKeeper = lazy(() => import('@pages/LoginAsKeeper/page'));
const LoginSelectRole = lazy(() => import('@pages/LoginSelectRole/page'));
const ExplorerCard = lazy(() => import('@pages/ExplorerCard'));
const Explorers = lazy(() => import('@pages/Explorers/page'));
const GalaxyPage = lazy(() => import('@pages/GalaxyPage/page'));
const KeeperCard = lazy(() => import('@pages/KeeperCard'));
const Keepers = lazy(() => import('@pages/Keepers/page'));
const Profile = lazy(() => import('@pages/Profile'));
const NotFound = lazy(() => import('@pages/NotFound'));
const AllGalaxiesPage = lazy(() => import('@pages/AllGalaxiesPage'));
const ThemeCardPage = lazy(() => import('@pages/ThemeCardPage/page'));
const HomeworkRequestCard = lazy(() => import('@pages/HomeworkRequestCard/page'));

export type RouteStatusType = 'protected' | 'auth';

interface RouteInterface {
	path: string;
	element: JSX.Element;
	status?: RouteStatusType;
}

export const routes: RouteInterface[] = [
	{
		path: URL_NOT_FOUND,
		element: <NotFound />,
	},
	{
		path: URL_PROFILE,
		element: <Profile />,
		status: 'protected',
	},
	{
		path: URL_LOGIN,
		element: <LoginSelectRole />,
		status: 'auth',
	},
	{
		path: URL_LOGIN_AS_EXPLORER,
		element: <LoginAsExplorer />,
		status: 'auth',
	},
	{
		path: URL_LOGIN_AS_KEEPER,
		element: <LoginAsKeeper />,
		status: 'auth',
	},
	{
		path: URL_DEFAULT,
		element: <Navigate to={URL_LOGIN} replace />,
	},
	{
		path: URL_KEEPER_CARD,
		element: <KeeperCard />,
		status: 'protected',
	},
	{
		path: URL_EXPLORER_CARD,
		element: <ExplorerCard />,
		status: 'protected',
	},
	{
		path: URL_GALAXY_CARD,
		element: <GalaxyPage />,
	},
	{
		path: URL_GALAXY,
		element: <AllGalaxiesPage />,
	},
	{
		path: URL_KEEPERS,
		element: <Keepers />,
		status: 'protected',
	},
	{
		path: URL_EXPLORERS,
		element: <Explorers />,
		status: 'protected',
	},
	{
		path: URL_THEME_CARD,
		element: <ThemeCardPage />,
		status: 'protected',
	},
	{
		path: URL_THEME_CARD_LAYOUT,
		element: <ThemeCardPage />,
		status: 'protected',
	},
	{
		path: URL_HOMEWORK_REQUEST_EXPLORER_CARD,
		element: <HomeworkRequestCard />,
		status: 'protected',
	},
	{
		path: URL_HOMEWORK_REQUEST_KEEPER_CARD,
		element: <HomeworkRequestCard />,
		status: 'protected',
	},
];
