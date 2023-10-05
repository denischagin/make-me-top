import { lazy } from 'react';

import {
    URL_DEFAULT,
    URL_EXPLORER_CARD,
    URL_EXPLORERS,
    URL_GALAXY,
    URL_GALAXY_CARD,
    URL_KEEPER_CARD,
    URL_KEEPERS,
    URL_LOGIN,
    URL_LOGIN_AS_EXPLORER,
    URL_LOGIN_AS_KEEPER,
    URL_NOT_FOUND,
    URL_PROFILE,
} from '@shared/constants/links';
const LoginSelectRole = lazy(() => import('@pages/LoginSelectRole/page'));
import { Navigate } from 'react-router-dom';

import LoginAsExplorer from '@pages/LoginAsExplorer/page';
import LoginAsKeeper from '@pages/LoginAsKeeper/page';
const ExplorerCard = lazy(() => import('@pages/ExplorerCard'));
const Explorers = lazy(() => import('@pages/Explorers/page'));
const GalaxyPage = lazy(() => import('@pages/GalaxyPage/page'));
const KeeperCard = lazy(() => import('@pages/KeeperCard'));
const Keepers = lazy(() => import('@pages/Keepers/page'));
const Profile = lazy(() => import('@pages/Profile'));
const NotFound = lazy(() => import('@pages/NotFound'));
const AllGalaxiesPage = lazy(() => import('@pages/AllGalaxiesPage'));

interface RouteInterface {
    path: string;
    element: JSX.Element;
    isPrivate?: boolean;
    isAuthPage?: boolean;
}

export const routes: RouteInterface[] = [
    {
        path: URL_NOT_FOUND,
        element: <NotFound />,
    },
    {
        path: URL_PROFILE,
        element: <Profile />,
        isPrivate: true,
    },
    {
        path: URL_LOGIN,
        element: <LoginSelectRole />,
    },
    {
        path: URL_LOGIN_AS_EXPLORER,
        element: <LoginAsExplorer />,
    },
    {
        path: URL_LOGIN_AS_KEEPER,
        element: <LoginAsKeeper />,
    },
    {
        path: URL_DEFAULT,
        element: <Navigate to={URL_LOGIN} replace />,
    },
    {
        path: URL_KEEPER_CARD,
        element: <KeeperCard />,
        isPrivate: true,
    },
    {
        path: URL_EXPLORER_CARD,
        element: <ExplorerCard />,
        isPrivate: true,
    },
    {
        path: URL_GALAXY_CARD,
        element: <GalaxyPage />,
        isPrivate: true,
    },
    {
        path: URL_GALAXY,
        element: <AllGalaxiesPage />,
        isPrivate: true,
    },
    {
        path: URL_KEEPERS,
        element: <Keepers />,
        isPrivate: true,
    },
    {
        path: URL_EXPLORERS,
        element: <Explorers />,
        isPrivate: true,
    },
];
