import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import {
    URL_CURATOR,
    URL_CURATORS,
    URL_CURATOR_CARD,
    URL_DEFAULT,
    URL_EXPLORER,
    URL_EXPLORERS,
    URL_GALAXY,
} from '@shared/constants/links';

import { Curator } from '@pages/Curator/page';
import { CuratorCard } from '@pages/CuratorCard';
import { Curators } from '@pages/Curators/page';
import { Explorer } from '@pages/Explorer/page';
import { Explorers } from '@pages/Explorers/page';
import { GalaxyPage } from '@pages/GalaxyPage/page';
import { Home } from '@pages/Home/page';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path={URL_DEFAULT}
                element={<Home />}
            />
            <Route
                path={URL_CURATOR}
                element={<Curator />}
            />
            <Route
                path={URL_CURATOR_CARD}
                element={<CuratorCard />}
            />
            <Route
                path={URL_EXPLORER}
                element={<Explorer />}
            />
            <Route
                path={URL_GALAXY}
                element={<GalaxyPage />}
            />
            <Route
                path={URL_CURATORS}
                element={<Curators />}
            />
            <Route
                path={URL_EXPLORERS}
                element={<Explorers />}
            />
        </>,
    ),
);
