import { createBrowserRouter } from "react-router-dom";

import { Curators } from "@/pages/Curators/page";
import { Explorers } from "@/pages/Explorers/page";
import { Home } from "@/pages/Home/page";
import { Curator } from "@/pages/user/Curator/page";
import { Explorer } from "@/pages/user/Explorer/page";
import { GalaxyPage } from "@/pages/GalaxyPage/page";

import {
  URL_CURATOR,
  URL_CURATORS,
  URL_DEFAULT,
  URL_EXPLORER,
  URL_EXPLORERS,
  URL_GALAXY,
} from "@/shared/constants/links";

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
