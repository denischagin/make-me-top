import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';

import {
    URL_DEFAULT,
    URL_EXPLORER,
    URL_EXPLORER_CARD,
    URL_EXPLORERS,
    URL_GALAXY,
    URL_KEEPER,
    URL_KEEPER_CARD,
    URL_KEEPERS,
    URL_PROFILE,
} from '@shared/constants/links';

import { Explorer } from '@pages/Explorer/page';
import { ExplorerCard } from '@pages/ExplorerCard';
import { Explorers } from '@pages/Explorers/page';
import { GalaxyPage } from '@pages/GalaxyPage/page';
import { Home } from '@pages/Home/page';
import { Keeper } from '@pages/Keeper/page';
import { KeeperCard } from '@pages/KeeperCard';
import { Keepers } from '@pages/Keepers/page';
import { Profile } from '@pages/Profile';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path={URL_PROFILE}
                element={<Profile />}
            />
            <Route
                path={URL_DEFAULT}
                element={<Home />}
            />
            <Route
                path={URL_KEEPER}
                element={<Keeper />}
            />
            <Route
                path={URL_KEEPER_CARD}
                element={<KeeperCard />}
            />
            <Route
                path={URL_EXPLORER_CARD}
                element={<ExplorerCard />}
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
                path={URL_KEEPERS}
                element={<Keepers />}
            />
            <Route
                path={URL_EXPLORERS}
                element={<Explorers />}
            />
        </>,
    ),
);
