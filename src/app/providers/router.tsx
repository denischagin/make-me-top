import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

import {
	URL_DEFAULT,
	URL_EXPLORER,
	URL_EXPLORER_CARD,
	URL_EXPLORERS,
	URL_GALAXY,
	URL_GALAXY_CARD,
	URL_KEEPER,
	URL_KEEPER_CARD,
	URL_KEEPERS,
	URL_NOT_FOUND,
	URL_PROFILE,
} from "@shared/constants/links";

import { Explorer } from "@pages/Explorer/page";
import { ExplorerCard } from "@pages/ExplorerCard";
import { Explorers } from "@pages/Explorers/page";
import { GalaxyPage } from "@pages/GalaxyPage/page";
import { Home } from "@pages/Home/page";
import { Keeper } from "@pages/Keeper/page";
import { KeeperCard } from "@pages/KeeperCard";
import { Keepers } from "@pages/Keepers/page";
import { Profile } from "@pages/Profile";
import { NotFound } from "@pages/NotFound";
import { AllGalaxiesPage } from "@pages/AllGalaxiesPage";
import { AuthProtect } from "@shared/utils/providers/AuthProtect";
import { privatePage } from "@shared/utils/helpers/privatePage";

interface RouteInterface {
	path: string;
	element: JSX.Element;
	isPrivate: boolean;
}

export const routes: RouteInterface[] = [
	{
		path: URL_NOT_FOUND,
		element: <NotFound />,
		isPrivate: false,
	},
	{
		path: URL_PROFILE,
		element: <Profile />,
		isPrivate: true,
	},
	{
		path: URL_DEFAULT,
		element: <Home />,
		isPrivate: false,
	},
	{
		path: URL_KEEPER_CARD,
		element: <KeeperCard />,
		isPrivate: true,
	},
	{
		path: URL_EXPLORER_CARD,
		element: <ExplorerCard />,
		isPrivate: true,
	},
	{
		path: URL_GALAXY_CARD,
		element: <GalaxyPage />,
		isPrivate: true,
	},
	{
		path: URL_GALAXY,
		element: <AllGalaxiesPage />,
		isPrivate: true,
	},
	{
		path: URL_KEEPERS,
		element: <Keepers />,
		isPrivate: true,
	},
	{
		path: URL_EXPLORERS,
		element: <Explorers />,
		isPrivate: true,
	},
];

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{routes.map(({ isPrivate, element, path }) =>
				isPrivate ? (
					<Route key={path} element={privatePage(element)} path={path} />
				) : (
					<Route key={path} element={element} path={path} />
				)
			)}
		</>
	)
);
