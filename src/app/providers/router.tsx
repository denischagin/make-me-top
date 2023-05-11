import { createBrowserRouter } from "react-router-dom";

import {
  URL_CURATOR,
  URL_CURATORS,
  URL_DEFAULT,
  URL_EXPLORER,
  URL_EXPLORERS,
  URL_GALAXY,
} from "@shared/constants/links";

import { Curators } from "@pages/Curators/page";
import { Explorers } from "@pages/Explorers/page";
import { GalaxyPage } from "@pages/GalaxyPage";
import { Home } from "@pages/Home/page";
import { Curator } from "@pages/Curator/page";
import { Explorer } from "@pages/Explorer/page";

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
]);
