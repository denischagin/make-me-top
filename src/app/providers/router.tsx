import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { authPage, openPage, protectPage } from '@entities/viewer';
import { authRoutes, openRoutes, protectedRoutes } from '@app/constants';


export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {protectedRoutes.map(({ element, path }) => (
                <Route
                    key={path}
                    element={protectPage(element)}
                    path={path}
                />
            ))}

            {authRoutes.map(({ element, path }) => (
                <Route
                    key={path}
                    element={authPage(element)}
                    path={path}
                />
            ))}

            {openRoutes.map(({ element, path }) => (
                <Route
                    key={path}
                    element={openPage(element)}
                    path={path}
                />
            ))}
        </>,
    ),
);
