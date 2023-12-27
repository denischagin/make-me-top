import { lazy, ReactElement } from 'react';
import { RouteObject } from 'react-router-dom';
import {
    URL_EXPLORER_CARD,
    URL_EXPLORERS, URL_HOMEWORK_REQUEST_EXPLORER_CARD, URL_HOMEWORK_REQUEST_KEEPER_CARD,
    URL_KEEPER_CARD,
    URL_KEEPERS,
    URL_PROFILE,
    URL_THEME_CARD, URL_THEME_CARD_LAYOUT,
} from '@shared/constants/links';

const ExplorerCard = lazy(() => import('@pages/ExplorerCard'));
const Explorers = lazy(() => import('@pages/Explorers/page'));
const KeeperCard = lazy(() => import('@pages/KeeperCard'));
const Keepers = lazy(() => import('@pages/Keepers/page'));
const Profile = lazy(() => import('@pages/Profile'));
const ThemeCardPage = lazy(() => import('@pages/ThemeCardPage/page'));
const HomeworkRequestCardPage = lazy(() => import('@pages/HomeworkRequestCard/page'));

export const protectedRoutes: { path: string, element: ReactElement }[] = [

    {
        path: URL_PROFILE,
        element: <Profile />,
    },
    {
        path: URL_KEEPER_CARD,
        element: <KeeperCard />,
    },
    {
        path: URL_EXPLORER_CARD,
        element: <ExplorerCard />,
    },
    {
        path: URL_KEEPERS,
        element: <Keepers />,
    },
    {
        path: URL_EXPLORERS,
        element: <Explorers />,
    },
    {
        path: URL_THEME_CARD,
        element: <ThemeCardPage />,
    },
    {
        path: URL_THEME_CARD_LAYOUT,
        element: <ThemeCardPage />,
    },
    {
        path: URL_HOMEWORK_REQUEST_EXPLORER_CARD,
        element: <HomeworkRequestCardPage />,
    },
    {
        path: URL_HOMEWORK_REQUEST_KEEPER_CARD,
        element: <HomeworkRequestCardPage />,
    },
];