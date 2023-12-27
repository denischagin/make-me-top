import { Navigate, RouteObject } from 'react-router-dom';
import { URL_DEFAULT, URL_GALAXY, URL_GALAXY_CARD, URL_LOGIN, URL_NOT_FOUND } from '@shared/constants/links';
import { lazy, ReactElement } from 'react';

const GalaxyPage = lazy(() => import('@pages/GalaxyPage/page'));
const NotFound = lazy(() => import('@pages/NotFound'));
const AllGalaxiesPage = lazy(() => import('@pages/AllGalaxiesPage'));
export const openRoutes: { path: string, element: ReactElement }[] = [
    {
        path: URL_GALAXY_CARD,
        element: <GalaxyPage />,
    },
    {
        path: URL_GALAXY,
        element: <AllGalaxiesPage />,
    },
    {
        path: URL_NOT_FOUND,
        element: <NotFound />,
    },
    {
        path: URL_DEFAULT,
        element: <Navigate to={URL_LOGIN} replace />,
    },

];
