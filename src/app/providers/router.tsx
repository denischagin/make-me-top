import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';
import { routes, RouteStatusType } from '@app/constants/routes';

import { privatePage } from '@entities/viewer/libs/helpers/privatePage';
import { authPage } from '@entities/viewer/libs/helpers/authPage';
import { openPage } from '@entities/viewer/libs/helpers/openPage';

const getHocPage: Record<
	RouteStatusType | 'default',
	(element: JSX.Element) => JSX.Element
> = {
	auth: authPage,
	protected: privatePage,
	default: openPage,
};

export const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{routes.map(({ element, path, status }) => (
				<Route
					key={path}
					element={getHocPage[status ?? 'default'](element)}
					path={path}
				/>
			))}
		</>,
	),
);
