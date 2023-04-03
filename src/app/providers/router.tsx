
import { GalaxyPage } from "../../pages/galaxyPage/page";
import { createBrowserRouter } from "react-router-dom";

import { Curators } from "@/pages/Curators/page";
import { Explorers } from "@/pages/Explorers/page";
import { Home } from "@/pages/Home/page";
import { Curator } from "@/pages/user/Curator/page";
import { Explorer } from "@/pages/user/Explorer/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/curator",
    element: <Curator />,
  },
  {
    path: "/explorer",
    element: <Explorer />,
  },
  {
    path: "/galaxy",
    element: <GalaxyPage/>,
  },
  {
    path: "/curators",
    element: <Curators />,
  },
  {
    path: "/explorers",
    element: <Explorers />,
  },
]);
