import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';

import { privatePage } from '@shared/utils/helpers/privatePage';
import { routes } from '@app/constants/routes';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {routes.map(({ isPrivate, element, path }) =>
                isPrivate ? (
                    <Route
                        key={path}
                        element={privatePage(element)}
                        path={path}
                    />
                ) : (
                    <Route key={path} element={element} path={path} />
                ),
            )}
        </>,
    ),
);
