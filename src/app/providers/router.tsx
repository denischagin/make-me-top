import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { routes } from '@app/constants/routes';

import { privatePage } from '@entities/viewer/libs/helpers/privatePage';
import { authPage } from '@entities/viewer/libs/helpers/authPage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {routes.map(({ isAuthPage, isPrivate, element, path }) => (
                <Route
                    key={path}
                    element={
                        isPrivate
                            ? privatePage(element)
                            : isAuthPage
                            ? authPage(element)
                            : element
                    }
                    path={path}
                />
            ))}
        </>,
    ),
);
