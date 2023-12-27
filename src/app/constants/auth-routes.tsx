import { RouteObject } from 'react-router-dom';
import { URL_LOGIN, URL_LOGIN_AS_EXPLORER, URL_LOGIN_AS_KEEPER } from '@shared/constants/links';
import { lazy, ReactElement } from 'react';

const LoginAsExplorer = lazy(() => import('@pages/LoginAsExplorer/page'));
const LoginAsKeeper = lazy(() => import('@pages/LoginAsKeeper/page'));
const LoginSelectRole = lazy(() => import('@pages/LoginSelectRole/page'));

export const authRoutes: { path: string, element: ReactElement }[] = [
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
];
