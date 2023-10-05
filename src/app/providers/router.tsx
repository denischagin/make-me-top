import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { routes } from '@app/constants/routes';

import { privatePage } from '@shared/utils/helpers/privatePage';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {routes.map(({ isPrivate, element, path }) => (
                <Route
                    key={path}
                    element={isPrivate ? privatePage(element) : element}
                    path={path}
                />
            ))}
        </>,
    ),
);
