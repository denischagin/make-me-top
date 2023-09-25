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
import { lazy } from "react";
import { privatePage } from "@shared/utils/helpers/privatePage";

const ExplorerCard = lazy(() => import("@pages/ExplorerCard"));
const Explorers = lazy(() => import("@pages/Explorers/page"));
const GalaxyPage = lazy(() => import("@pages/GalaxyPage/page"));
const Home = lazy(() => import("@pages/Home/page"));
const KeeperCard = lazy(() => import("@pages/KeeperCard"));
const Keepers = lazy(() => import("@pages/Keepers/page"));
const Profile = lazy(() => import("@pages/Profile"));
const NotFound = lazy(() => import("@pages/NotFound"));
const AllGalaxiesPage = lazy(() => import("@pages/AllGalaxiesPage"));

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
		isPrivate: false,
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
