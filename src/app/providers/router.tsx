import { createBrowserRouter } from "react-router-dom";

import {
  URL_CURATOR,
  URL_CURATORS,
  URL_DEFAULT,
  URL_EXPLORER,
  URL_EXPLORERS,
  URL_GALAXY,
  URL_CURATOR_CARD
} from "@shared/constants/links";

import { Curator } from "@pages/Curator/page";
import { Curators } from "@pages/Curators/page";
import { Explorer } from "@pages/Explorer/page";
import { Explorers } from "@pages/Explorers/page";
import { GalaxyPage } from "@pages/GalaxyPage/page";
import { CuratorCard } from "@pages/CuratorCard";
import { Home } from "@pages/Home/page";


export const router = createBrowserRouter([
  {
    path: URL_DEFAULT,
    element: <Home />,
  },
  {
    path: URL_CURATOR,
    element: <Curator />,
  },
  {
    path: URL_EXPLORER,
    element: <Explorer />,
  },
  {
    path: URL_GALAXY,
    element: <GalaxyPage />,
  },
  {
    path: URL_CURATORS,
    element: <Curators />,
  },
  {
    path: URL_EXPLORERS,
    element: <Explorers />,
  },
  {
    path: URL_CURATOR_CARD,
    element: <CuratorCard />,
  },
]);
