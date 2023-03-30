import { Galaxy } from "../../pages/galaxy/page";
import { Curator } from "../../pages/user/curator/page";
import { Explorer } from "../../pages/user/explorer/page";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../../pages/home/page";
import { Curators } from "../../pages/curators/page";
import { Explorers } from "../../pages/explorers/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/curator",
    element: <Curator/>,
  },
  {
    path: "/explorer",
    element: <Explorer/>,
  },
  {
    path: "/galaxy",
    element: <Galaxy/>,
  },
  {
    path: "/curators",
    element: <Curators/>,
  },
  {
    path: "/explorers",
    element: <Explorers/>,
  },
]);